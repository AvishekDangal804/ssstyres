"use server";

import {
  cleanText,
  deliverLead,
  DELIVERY_FAILURE_MESSAGE,
  isValidEmail,
} from "@/lib/lead-delivery";
import { BUSINESS_TYPES } from "./constants";

export type DealerApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// ABR-published ABN checksum (weighted modulus 89). Confirms the number is
// well-formed — it does not check the ABN is actually registered, which
// would require the ABR Lookup web service (abr.business.gov.au) and a GUID.
function isValidAbn(raw: string): boolean {
  const digits = raw.replace(/\s+/g, "");
  if (!/^\d{11}$/.test(digits)) return false;
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const nums = digits.split("").map(Number);
  nums[0] -= 1;
  const sum = nums.reduce((acc, n, i) => acc + n * weights[i], 0);
  return sum % 89 === 0;
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 12;
}

export async function submitDealerApplication(
  _prev: DealerApplicationState,
  formData: FormData
): Promise<DealerApplicationState> {
  // Honeypot: real visitors never fill this hidden field.
  if (cleanText(formData.get("company_website"), 200) !== "") {
    return { status: "success" };
  }

  const businessName = cleanText(formData.get("businessName"), 120);
  const abn = cleanText(formData.get("abn"), 20);
  const businessType = cleanText(formData.get("businessType"), 60);
  const contactName = cleanText(formData.get("contactName"), 100);
  const phone = cleanText(formData.get("phone"), 30);
  const email = cleanText(formData.get("email"), 254);
  const notes = cleanText(formData.get("notes"), 2000);

  if (!businessName || !contactName) {
    return { status: "error", message: "Please fill in all required fields." };
  }
  if (!isValidAbn(abn)) {
    return { status: "error", message: "Enter a valid 11-digit ABN." };
  }
  if (!BUSINESS_TYPES.includes(businessType as (typeof BUSINESS_TYPES)[number])) {
    return { status: "error", message: "Select a business type." };
  }
  if (!isValidPhone(phone)) {
    return { status: "error", message: "Enter a valid phone number." };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const result = await deliverLead(
    "Dealer application",
    businessName,
    [
      ["Business name", businessName],
      ["ABN", abn],
      ["Business type", businessType],
      ["Contact name", contactName],
      ["Phone", phone],
      ["Email", email],
      ["Notes", notes],
    ],
    email
  );
  if (!result.ok) {
    return { status: "error", message: DELIVERY_FAILURE_MESSAGE };
  }

  return { status: "success" };
}
