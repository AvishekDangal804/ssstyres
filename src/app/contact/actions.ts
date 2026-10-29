"use server";

import {
  cleanText,
  deliverLead,
  DELIVERY_FAILURE_MESSAGE,
  isValidEmail,
} from "@/lib/lead-delivery";
import { ENQUIRY_TOPICS } from "./constants";

export type ContactEnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactEnquiry(
  _prev: ContactEnquiryState,
  formData: FormData
): Promise<ContactEnquiryState> {
  // Honeypot: real visitors never fill this hidden field.
  if (cleanText(formData.get("company_website"), 200) !== "") {
    return { status: "success" };
  }

  const name = cleanText(formData.get("name"), 100);
  const phone = cleanText(formData.get("phone"), 30);
  const email = cleanText(formData.get("email"), 254);
  const topic = cleanText(formData.get("topic"), 60);
  const message = cleanText(formData.get("message"), 5000);

  if (!name) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!isValidEmail(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (!ENQUIRY_TOPICS.includes(topic as (typeof ENQUIRY_TOPICS)[number])) {
    return { status: "error", message: "Select what your enquiry is about." };
  }
  if (!message) {
    return { status: "error", message: "Enter a message." };
  }

  const result = await deliverLead(
    "Contact enquiry",
    `${topic} — ${name}`,
    [
      ["Name", name],
      ["Phone", phone],
      ["Email", email],
      ["Topic", topic],
      ["Message", message],
    ],
    email
  );
  if (!result.ok) {
    return { status: "error", message: DELIVERY_FAILURE_MESSAGE };
  }

  return { status: "success" };
}
