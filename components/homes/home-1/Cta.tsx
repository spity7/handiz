import Link from "next/link";
import Image from "next/image";

export default function Cta() {
  return (
    <div className="section-cta text-center tf-spacing-1">
      <div className="tf-container">
        <h1 className="mb_20">Let’s Start The Conversation!</h1>
        <p>
          Have a story to share or a question to ask? Reach out we're always
          <br />
          listening and excited to hear from you!
        </p>
        <Link
          href={`/contact`}
          className="tf-btn btn-switch-text animate-hover-btn mx-auto"
        >
          <span>
            <span className="btn-double-text" data-text="Contact Us">
              Contact Us
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
