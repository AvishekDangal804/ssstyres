"use client";

import { useActionState, useState } from "react";
import { submitContactEnquiry, type ContactEnquiryState } from "./actions";
import { ENQUIRY_TOPICS } from "./constants";
import styles from "./Contact.module.css";

const initialState: ContactEnquiryState = { status: "idle" };

type Values = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
};

const emptyValues: Values = {
  name: "",
  phone: "",
  email: "",
  topic: ENQUIRY_TOPICS[0],
  message: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactEnquiry,
    initialState
  );
  // Controlled, not uncontrolled: React clears uncontrolled fields after any
  // non-throwing form action, including our own validation-error responses.
  const [values, setValues] = useState<Values>(emptyValues);

  const field =
    (key: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  if (state.status === "success") {
    return (
      <div className={styles.successWrap}>
        <div className={styles.successIcon}>✓</div>
        <div className={styles.successTitle}>Enquiry sent</div>
        <p className={styles.successBody}>
          Thanks — we&apos;ll get back to you as soon as we can. Urgent?
          Call <a href="tel:0391165787">03 9116 5787</a>.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className={styles.formTitle}>Send an enquiry</h2>
      <form action={formAction} className={styles.form}>
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          className={styles.honeypot}
          aria-hidden="true"
        />
        <div className={styles.row2}>
          <label className={styles.field}>
            Name
            <input
              required
              name="name"
              maxLength={100}
              autoComplete="name"
              placeholder="Full name"
              value={values.name}
              onChange={field("name")}
            />
          </label>
          <label className={styles.field}>
            Phone
            <input
              type="tel"
              name="phone"
              maxLength={30}
              autoComplete="tel"
              placeholder="04xx xxx xxx"
              value={values.phone}
              onChange={field("phone")}
            />
          </label>
        </div>
        <label className={styles.field}>
          Email
          <input
            required
            type="email"
            name="email"
            maxLength={254}
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={field("email")}
          />
        </label>
        <label className={styles.field}>
          What&apos;s it about?
          <select name="topic" value={values.topic} onChange={field("topic")}>
            {ENQUIRY_TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Message
          <textarea
            required
            rows={4}
            name="message"
            maxLength={5000}
            placeholder="Vehicle, sizes, quantities — the more detail the better"
            value={values.message}
            onChange={field("message")}
          />
        </label>
        {state.status === "error" && (
          <div className={styles.formError} role="alert">
            {state.message}
          </div>
        )}
        <button type="submit" disabled={isPending} className={styles.submitBtn}>
          {isPending ? "Sending…" : "Send enquiry"}
        </button>
      </form>
    </>
  );
}
