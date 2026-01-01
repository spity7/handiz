"use client";

import { FormEvent, useState } from "react";

export default function WhatsappForm() {
  const [showMessage, setShowMessage] = useState(false);

  const sendToWhatsApp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const message = (form.elements.namedItem("message") as HTMLInputElement)
      ?.value;

    if (!message) return;

    const whatsappUrl = `https://wa.me/96171601751?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    form.reset();
    setShowMessage(true);

    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <form onSubmit={sendToWhatsApp} className="form-newslate mb_20">
      <div className="position-relative">
        <fieldset className="fieldset-item">
          <textarea
            name="message"
            placeholder="Write your message..."
            required
            rows={3}
            style={{ resize: "none", color: "#fff" }}
          />
        </fieldset>

        <div className="box-btn">
          <button type="submit" className="btn-submit animate-hover-btn">
            <span className="icon-PaperPlaneTilt" />
          </button>
        </div>
      </div>

      <div
        className={`tfSubscribeMsg footer-sub-element ${
          showMessage ? "active" : ""
        }`}
      >
        <p style={{ color: "rgb(52, 168, 83)" }}>Opening WhatsApp…</p>
      </div>
    </form>
  );
}
