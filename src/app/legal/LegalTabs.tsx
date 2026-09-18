"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./Legal.module.css";

type Tab = "terms" | "warranty" | "privacy";

const TABS: { id: Tab; label: string }[] = [
  { id: "terms", label: "Terms & Conditions" },
  { id: "warranty", label: "Warranty & Refunds" },
  { id: "privacy", label: "Privacy Policy" },
];

function Entry({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className={styles.entryNum}>{num}</div>
      <h2 className={styles.entryTitle}>{title}</h2>
      <div className={styles.entryBody}>{children}</div>
    </div>
  );
}

export default function LegalTabs() {
  const [tab, setTab] = useState<Tab>("terms");

  useEffect(() => {
    const read = () => {
      const h = (window.location.hash || "").replace("#", "");
      if (h === "terms" || h === "warranty" || h === "privacy") setTab(h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const pick = (t: Tab) => {
    setTab(t);
    try {
      history.replaceState(null, "", `#${t}`);
    } catch {
      // ignore — non-browser environment
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.tabs} role="tablist" aria-label="Legal documents">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onKeyDown={(e) => {
              const i = TABS.findIndex((x) => x.id === t.id);
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const next = TABS[(i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length];
                pick(next.id);
                document.getElementById(`tab-${next.id}`)?.focus();
              }
            }}
            onClick={() => pick(t.id)}
            className={`${styles.tabBtn} ${tab === t.id ? styles.active : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "terms" && (
        <div className={styles.entries} role="tabpanel" id="panel-terms" aria-labelledby="tab-terms">
          <Entry num="01" title="Who These Terms Apply To">
            <p>
              These Terms govern your use of ssswheels.com.au and any
              purchase from SSS Wheels &amp; Tyres Pty Ltd. A &quot;Customer&quot;
              is any person or business who accesses the Site — whether or
              not they hold a registered trade account with us — including
              anyone acting on behalf of a business under actual or apparent
              authority to do so. By browsing the Site, registering for a
              trade account, or placing an order, you agree to be bound by
              these Terms.
            </p>
          </Entry>
          <Entry num="02" title="Use of the Website">
            <p>
              You may use the Site for your own genuine business or personal
              purposes connected with purchasing from us. You must not copy,
              scrape, reproduce or redistribute any content, pricing, images
              or product data from the Site for resale, mass communication,
              or to support a competing business without our written
              consent.
            </p>
            <p>
              The Site may contain content or links provided by third
              parties. We are not responsible for the accuracy or
              reliability of third-party content, and do not accept
              liability arising from your use of any linked third-party
              website.
            </p>
            <p>
              We may update, suspend or discontinue any part of the Site, or
              change these Terms, at any time. Continued use of the Site
              after a change takes effect means you accept the updated
              Terms.
            </p>
          </Entry>
          <Entry num="03" title="Trade & Wholesale Accounts">
            <p>
              SSS Wheels primarily supplies panel shops, mechanical
              workshops, fleet and rideshare operators, and approved tyre
              resellers on a wholesale basis. To place wholesale orders you
              will generally need to register for a trade account and be
              approved by us.
            </p>
            <p>
              We may decline an application for a trade account at our
              discretion, and may suspend or close an account where these
              Terms are breached, where we reasonably suspect misuse, or on
              reasonable notice for any other reason.
            </p>
            <p>
              You are responsible for keeping your account login details
              secure and for all activity conducted through your account.
            </p>
          </Entry>
          <Entry num="04" title="Product Information & Pricing">
            <p>
              We take care to keep product descriptions, specifications and
              pricing accurate, but errors can occur — for example a
              typographical error, or a mistake in information supplied by a
              manufacturer or distributor. Where a product is listed with
              incorrect pricing or specifications, we reserve the right to
              correct the error and to cancel any order affected by it. If
              payment has already been made on a cancelled order, we will
              provide a full refund of that payment.
            </p>
            <p>
              Prices displayed on the Site are in Australian dollars. Unless
              stated otherwise, prices exclude delivery, which is confirmed
              at the time of order.
            </p>
          </Entry>
          <Entry num="05" title="Orders & Payment">
            <p>
              Placing an order is an offer to purchase, which we may accept,
              decline or adjust (including quantity limits) at our
              discretion. An order is only confirmed once we issue an order
              confirmation.
            </p>
            <p>
              Accepted payment methods are listed at checkout or on your
              account, and may include direct bank transfer, credit/debit
              card, and other methods we make available from time to time.
              Goods are generally dispatched once cleared payment has been
              received, unless you hold an approved trade account with
              agreed payment terms.
            </p>
            <p>
              We may need to verify your identity or payment details before
              processing an order.
            </p>
          </Entry>
          <Entry num="06" title="Delivery">
            <p>
              Estimated delivery timeframes are provided in good faith but
              are not guaranteed, and we are not liable for delays caused by
              carriers or events outside our reasonable control. We choose
              the carrier and delivery method we consider most efficient
              unless you request otherwise, which may affect delivery cost
              or timing.
            </p>
            <p>
              Please inspect goods on delivery. If you receive the wrong
              item, do not open sealed packaging — contact us straight away
              so we can arrange collection and correction.
            </p>
          </Entry>
          <Entry num="07" title="Title & Risk">
            <p>
              Ownership of goods does not pass to you until we have received
              payment in full. Until then, we may recover or resell the
              goods. Risk in the goods (loss or damage) passes to you on
              delivery to the address you provide.
            </p>
          </Entry>
          <Entry num="08" title="Cancellations">
            <p>
              If you need to cancel an order, contact us as soon as
              possible. Orders cancelled after dispatch are treated as a
              return and are subject to our Warranty &amp; Refund Policy,
              including any applicable restocking fee and return freight
              costs.
            </p>
          </Entry>
          <Entry num="09" title="Intellectual Property">
            <p>
              All content on the Site — including text, images, logos and
              product data — is owned by SSS Wheels or used with permission,
              and is protected by copyright and other intellectual property
              laws. You may not reproduce or commercially use this content
              without our written consent.
            </p>
            <p>
              Any feedback, reviews or suggestions you submit to us may be
              used by SSS Wheels without restriction or compensation.
            </p>
          </Entry>
          <Entry num="10" title="Limitation of Liability">
            <p>
              To the maximum extent permitted by law, the Site and its
              content are provided &quot;as is&quot; without warranties of
              any kind. Nothing in these Terms excludes, restricts or
              modifies any consumer guarantee, right or remedy that cannot
              lawfully be excluded under the Australian Consumer Law.
            </p>
            <p>
              Subject to that, SSS Wheels is not liable for indirect or
              consequential loss (such as loss of profits or business
              interruption) arising from use of the Site, except where such
              liability cannot be excluded by law.
            </p>
          </Entry>
          <Entry num="11" title="Indemnity">
            <p>
              You agree to indemnify SSS Wheels against any claims, losses
              or costs arising from your breach of these Terms or misuse of
              the Site.
            </p>
          </Entry>
          <Entry num="12" title="Governing Law">
            <p>
              These Terms are governed by the laws of the State of Victoria,
              Australia, and you submit to the non-exclusive jurisdiction of
              its courts.
            </p>
          </Entry>
          <Entry num="13" title="Contact Us">
            <p>
              Questions about these Terms can be sent to{" "}
              <a href="mailto:info@ssswheels.com.au">info@ssswheels.com.au</a>
              , or by phone on <a href="tel:0391165787">03 9116 5787</a>{" "}
              during business hours.
            </p>
          </Entry>
        </div>
      )}

      {tab === "warranty" && (
        <div className={styles.entries} role="tabpanel" id="panel-warranty" aria-labelledby="tab-warranty">
          <Entry num="01" title="Your Rights Under Australian Consumer Law">
            <p>
              Our goods come with guarantees that cannot be excluded under
              the Australian Consumer Law. You are entitled to a replacement
              or refund for a major failure, and to compensation for any
              other reasonably foreseeable loss or damage. You are also
              entitled to have goods repaired or replaced if they fail to be
              of acceptable quality and the failure does not amount to a
              major failure. Nothing in this policy limits those rights.
            </p>
          </Entry>
          <Entry num="02" title="Manufacturer's Warranty">
            <p>
              SSS wheels are warranted against structural manufacturing
              defects for 12 months from the date of purchase, and against
              finish defects (peeling, blistering or discolouration under
              normal use) for 6 months. This warranty is in addition to your
              rights under the Australian Consumer Law.
            </p>
            <p>
              The warranty applies to the original purchaser and to wheels
              fitted, balanced and maintained in accordance with the vehicle
              manufacturer&apos;s specifications and our fitment guide.
            </p>
          </Entry>
          <Entry num="03" title="What's Not Covered">
            <p>
              The manufacturer&apos;s warranty does not cover damage caused
              by impact (potholes, kerbs, rocks), incorrect fitment or load
              beyond the stated rating, use in competition or commercial
              racing, corrosion caused by harsh chemicals or brake dust left
              uncleaned, modification (including re-machining or
              re-finishing), or normal wear and tear. Beadlock wheels used
              at low pressures off-road must be inspected and re-torqued
              regularly; damage from neglected hardware is not covered.
            </p>
          </Entry>
          <Entry num="04" title="Making a Warranty Claim">
            <p>
              If you purchased through one of our dealers or resellers,
              lodge the claim through your place of purchase — they will
              coordinate with us. Trade account holders can contact their
              account manager or email{" "}
              <a href="mailto:info@ssswheels.com.au">info@ssswheels.com.au</a>{" "}
              directly.
            </p>
            <p>
              Please include your proof of purchase, clear photos of the
              issue and the wheel&apos;s fitment details. Stop using a wheel
              you believe is defective. We may ask to inspect the wheel
              before approving a remedy, and will cover reasonable return
              freight on approved claims.
            </p>
          </Entry>
          <Entry num="05" title="Returns & Change of Mind">
            <p>
              We accept change-of-mind returns within 14 days of delivery
              for wheels that are unused, unfitted (no tyre has been
              mounted) and in their original packaging. A restocking fee of
              15% applies, and return freight is at your cost.
            </p>
            <p>
              Wheels that have been fitted, driven on or modified cannot be
              returned for change of mind. Custom-ordered or specially
              finished wheels are excluded unless faulty.
            </p>
          </Entry>
          <Entry num="06" title="Wrong or Damaged Deliveries">
            <p>
              Inspect goods on delivery. If you receive the wrong item or
              transit-damaged goods, contact us within 48 hours and do not
              open sealed packaging. We will arrange collection and a
              replacement or refund at no cost to you.
            </p>
          </Entry>
          <Entry num="07" title="Refund Processing">
            <p>
              Approved refunds are processed to the original payment method
              within 10 business days of our receiving and inspecting the
              returned goods. Trade account credits are applied to the
              account within the same period.
            </p>
          </Entry>
        </div>
      )}

      {tab === "privacy" && (
        <div className={styles.entries} role="tabpanel" id="panel-privacy" aria-labelledby="tab-privacy">
          <Entry num="01" title="Who We Are">
            <p>
              This policy explains how SSS Wheels &amp; Tyres Pty Ltd
              collects, uses and protects your personal information, in
              accordance with the Privacy Act 1988 (Cth) and the Australian
              Privacy Principles.
            </p>
          </Entry>
          <Entry num="02" title="What We Collect">
            <p>
              We collect information you provide when you enquire, register
              for a trade account or place an order — such as your name,
              business name and ABN, delivery address, email, phone number
              and order history. We also collect limited technical data
              (such as browser type and pages visited) when you use the
              Site.
            </p>
          </Entry>
          <Entry num="03" title="How We Use It">
            <p>
              We use your information to process and deliver orders, manage
              trade accounts, verify identity and payment, respond to
              enquiries and warranty claims, improve the Site, and — where
              you have opted in — send product news and trade offers.
            </p>
          </Entry>
          <Entry num="04" title="Who We Share It With">
            <p>
              We share information only as needed to run the business:
              freight carriers (to deliver your order), payment providers
              (to process payment), our IT and ordering-platform providers,
              and government bodies where required by law. We do not sell
              your personal information.
            </p>
          </Entry>
          <Entry num="05" title="Storage & Security">
            <p>
              Your information is stored on secure systems with access
              limited to staff who need it. We take reasonable steps to
              protect it from misuse, loss and unauthorised access, and we
              destroy or de-identify information we no longer need.
            </p>
          </Entry>
          <Entry num="06" title="Cookies & Analytics">
            <p>
              The Site uses cookies and analytics tools to remember
              preferences and understand how the Site is used. You can
              disable cookies in your browser; some features may not work
              as intended without them.
            </p>
          </Entry>
          <Entry num="07" title="Marketing">
            <p>
              We only send marketing where you have opted in, and every
              message includes an unsubscribe link. You can opt out at any
              time by using that link or emailing us.
            </p>
          </Entry>
          <Entry num="08" title="Access, Correction & Complaints">
            <p>
              You may request access to, or correction of, the personal
              information we hold about you by contacting{" "}
              <a href="mailto:info@ssswheels.com.au">info@ssswheels.com.au</a>{" "}
              or <a href="tel:0391165787">03 9116 5787</a>. If you believe
              we have breached the Australian Privacy Principles, contact us
              first — if you are not satisfied with our response, you may
              complain to the Office of the Australian Information
              Commissioner (oaic.gov.au).
            </p>
          </Entry>
        </div>
      )}
    </section>
  );
}
