"use client";

import axios from "axios";
import { FormEvent, useState } from "react";

export default function NewsLetterForm() {
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };
  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        { email }
      );

      if ([200, 201].includes(response.status)) {
        form.reset();
        setSuccess(true);
        handleShowMessage();
      } else {
        console.log(response);
        setSuccess(false);
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error || "An error occurred");
      setSuccess(false);
      handleShowMessage();
      form.reset();
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendEmail(e);
      }}
      className="form-newslate mb_20"
    >
      <div className="position-relative">
        <fieldset className="fieldset-item">
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            aria-required="true"
            required
          />
        </fieldset>
        <div className="box-btn">
          <button
            id="subscribe-button"
            type="submit"
            className="btn-submit animate-hover-btn"
          >
            <span className="icon-PaperPlaneTilt" />
          </button>
        </div>
      </div>

      <div
        className={`tfSubscribeMsg  footer-sub-element ${
          showMessage ? "active" : ""
        }`}
      >
        {success ? (
          <p style={{ color: "rgb(52, 168, 83)" }}>
            You have successfully subscribed.
          </p>
        ) : (
          <p style={{ color: "red" }}>Something went wrong</p>
        )}
      </div>
    </form>
  );
}
