"use server";

import { ENQUIRY_TOPICS } from "./constants";

export type ContactEnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContactEnquiry(
  _prev: ContactEnquiryState,
  formData: FormData
): Promise<ContactEnquiryState> {
  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get("company_website") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

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

  // TODO(go-live): wire this up to a real delivery channel (transactional
  // email or CRM webhook) — nothing is sent anywhere yet, this just logs
  // the validated enquiry server-side.
  console.log("[contact-enquiry]", {
    name,
    phone,
    email,
    topic,
    message,
    receivedAt: new Date().toISOString(),
  });

  return { status: "success" };
}
