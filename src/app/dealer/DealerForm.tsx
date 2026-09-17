"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitDealerApplication, type DealerApplicationState } from "./actions";
import { BUSINESS_TYPES } from "./constants";
import styles from "./Dealer.module.css";

const initialState: DealerApplicationState = { status: "idle" };

type Values = {
  businessName: string;
  abn: string;
  businessType: string;
  contactName: string;
  phone: string;
  email: string;
  notes: string;
};

const emptyValues: Values = {
  businessName: "",
  abn: "",
  businessType: BUSINESS_TYPES[0],
  contactName: "",
  phone: "",
  email: "",
  notes: "",
};

export default function DealerForm() {
  const [state, formAction, isPending] = useActionState(
    submitDealerApplication,
    initialState
  );
  // Kept in client state (not just uncontrolled inputs) because React clears
  // uncontrolled fields after any non-throwing form action — including our
  // validation-error state — which would force a re-type on every mistake.
  const [values, setValues] = useState<Values>(emptyValues);

  const field =
    (key: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  if (state.status === "success") {
    return (
      <div className={styles.successWrap}>
        <div className={styles.successIcon}>✓</div>
        <div className={styles.successTitle}>Application received</div>
        <p className={styles.successBody}>
          Thanks — our trade team will be in touch within one business day.
        </p>
        <p className={styles.successSub}>
          Need it sooner? Call <a href="tel:0391165787">03 9116 5787</a>.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className={styles.formTitle}>Trade account application</h2>
      <form action={formAction} className={styles.form}>
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          className={styles.honeypot}
          aria-hidden="true"
        />
        <label className={styles.field}>
          Business name
          <input
            required
            name="businessName"
            placeholder="e.g. Southside Tyre & Auto"
            value={values.businessName}
            onChange={field("businessName")}
          />
        </label>
        <div className={styles.row2}>
          <label className={styles.field}>
            ABN
            <input
              required
              name="abn"
              placeholder="00 000 000 000"
              value={values.abn}
              onChange={field("abn")}
            />
          </label>
          <label className={styles.field}>
            Business type
            <select
              name="businessType"
              value={values.businessType}
              onChange={field("businessType")}
            >
              {BUSINESS_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.row2}>
          <label className={styles.field}>
            Contact name
            <input
              required
              name="contactName"
              placeholder="Full name"
              value={values.contactName}
              onChange={field("contactName")}
            />
          </label>
          <label className={styles.field}>
            Phone
            <input
              required
              type="tel"
              name="phone"
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
            placeholder="you@business.com.au"
            value={values.email}
            onChange={field("email")}
          />
        </label>
        <label className={styles.field}>
          Anything we should know?
          <textarea
            rows={3}
            name="notes"
            placeholder="Volumes, brands you fit, locations…"
            value={values.notes}
            onChange={field("notes")}
          />
        </label>
        {state.status === "error" && (
          <div className={styles.formError} role="alert">
            {state.message}
          </div>
        )}
        <button type="submit" disabled={isPending} className={styles.submitBtn}>
          {isPending ? "Submitting…" : "Submit application"}
        </button>
        <div className={styles.legalLine}>
          By applying you agree to our{" "}
          <Link href="/legal#terms">Terms &amp; Conditions</Link>. We&apos;ll
          only use your details as described in our{" "}
          <Link href="/legal#privacy">Privacy Policy</Link>.
        </div>
      </form>
    </>
  );
}
