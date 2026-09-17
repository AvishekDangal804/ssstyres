"use server";

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

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
  if (String(formData.get("company_website") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const businessName = String(formData.get("businessName") ?? "").trim();
  const abn = String(formData.get("abn") ?? "").trim();
  const businessType = String(formData.get("businessType") ?? "").trim();
  const contactName = String(formData.get("contactName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

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

  // TODO(go-live): wire this up to a real delivery channel (transactional
  // email or CRM webhook) — nothing is sent anywhere yet, this just logs
  // the validated application server-side.
  console.log("[dealer-application]", {
    businessName,
    abn,
    businessType,
    contactName,
    phone,
    email,
    notes,
    receivedAt: new Date().toISOString(),
  });

  return { status: "success" };
}
