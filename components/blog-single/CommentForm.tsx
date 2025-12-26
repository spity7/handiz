"use client";

export default function CommentForm() {
  return (
    <form className="form-leave-comment" onSubmit={(e) => e.preventDefault()}>
      <div className="wrap">
        <div className="tf-grid-layout md-col-2 mb_20">
          <fieldset className="">
            <input
              className=""
              type="text"
              placeholder="Your Name*"
              name="text"
              tabIndex={2}
              defaultValue=""
              aria-required="true"
              required
            />
          </fieldset>
          <fieldset className="">
            <input
              className=""
              type="email"
              placeholder="Your Email*"
              name="email"
              tabIndex={2}
              defaultValue=""
              aria-required="true"
              required
            />
          </fieldset>
        </div>
        <fieldset className="mb_24">
          <textarea
            className=""
            rows={4}
            placeholder="Your Email*"
            tabIndex={2}
            aria-required="true"
            required
            defaultValue={""}
          />
        </fieldset>
      </div>
      <div className="button-submit mt_49">
        <button
          className="tf-btn animate-hover-btn btn-switch-text"
          type="submit"
        >
          <span>
            <span className="btn-double-text" data-text="Submit Review">
              Submit Review
            </span>
          </span>
        </button>
      </div>
    </form>
  );
}
