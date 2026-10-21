"use client";

import { useState } from "react";
import {
  cleanText,
  isValidEmail,
  submitToWeb3Forms,
  FORM_FAILURE_MESSAGE,
} from "@/lib/form-validation";
import { ENQUIRY_TOPICS } from "./constants";
import styles from "./Contact.module.css";

type Status = "idle" | "pending" | "success" | "error";

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
  const [values, setValues] = useState<Values>(emptyValues);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState("");

  const field =
    (key: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Honeypot: real visitors never fill this hidden field.
    if (botcheck !== "") {
      setStatus("success");
      return;
    }

    const name = cleanText(values.name, 100);
    const phone = cleanText(values.phone, 30);
    const email = cleanText(values.email, 254);
    const topic = cleanText(values.topic, 60);
    const msg = cleanText(values.message, 5000);

    if (!name) {
      setStatus("error");
      setMessage("Please enter your name.");
      return;
    }
    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }
    if (!ENQUIRY_TOPICS.includes(topic as (typeof ENQUIRY_TOPICS)[number])) {
      setStatus("error");
      setMessage("Select what your enquiry is about.");
      return;
    }
    if (!msg) {
      setStatus("error");
      setMessage("Enter a message.");
      return;
    }

    setStatus("pending");
    const result = await submitToWeb3Forms(`Contact enquiry — ${topic} — ${name}`, email, {
      Name: name,
      Phone: phone || "—",
      Email: email,
      Topic: topic,
      Message: msg,
    });
    if (!result.ok) {
      setStatus("error");
      setMessage(FORM_FAILURE_MESSAGE);
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          className={styles.honeypot}
          aria-hidden="true"
          value={botcheck}
          onChange={(e) => setBotcheck(e.target.value)}
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
        {status === "error" && (
          <div className={styles.formError} role="alert">
            {message}
          </div>
        )}
        <button
          type="submit"
          disabled={status === "pending"}
          className={styles.submitBtn}
        >
          {status === "pending" ? "Sending…" : "Send enquiry"}
        </button>
      </form>
    </>
  );
}
