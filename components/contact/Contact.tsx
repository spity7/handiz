"use client";

export default function Contact() {
  return (
    <form className="form-contact" onSubmit={(e) => e.preventDefault()}>
      <div className="wrap">
        <div className="tf-grid-layout md-col-2 mb_20">
          <fieldset className="">
            <label
              className="text-body-1 mb_8 text_on-surface-color"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name*"
              name="name"
              tabIndex={2}
              defaultValue="Tony Nguyen |"
              aria-required="true"
              required
            />
          </fieldset>
          <fieldset className="">
            <label
              className="text-body-1 mb_8 text_on-surface-color"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className=""
              type="number"
              placeholder="Phone"
              name="phone"
              tabIndex={2}
              defaultValue=""
              id="phone"
              aria-required="true"
              required
            />
          </fieldset>
        </div>
        <fieldset>
          <label
            className="text-body-1 mb_12 text_on-surface-color"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            className=""
            rows={4}
            placeholder="Write note"
            tabIndex={2}
            aria-required="true"
            required
            defaultValue={""}
          />
        </fieldset>
      </div>
      <div className="button-submit">
        <button
          className="tf-btn animate-hover-btn btn-switch-text"
          type="submit"
        >
          <span>
            <span className="btn-double-text" data-text="Send Message">
              Send Message
            </span>
          </span>
        </button>
      </div>
    </form>
  );
}
