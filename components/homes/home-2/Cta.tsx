import NewsLetterForm from "@/components/common/NewsLetterForm";

export default function Cta() {
  return (
    <div className="tf-container w-xxl">
      <div className="newsletter-item style-1 d-flex justify-content-between">
        <h3 className="title">Subscribe Now To Stay Updated With Top News!</h3>
        <p className="description">
          Subscribe now to stay updated with all the top news, exclusive
          insights, and weekly highlights you won’t want to miss.
        </p>
        <div className="form">
          <NewsLetterForm />
          <div className="box-fieldset-item d-flex">
            <fieldset className="d-flex gap_12">
              <input type="checkbox" className="tf-check" />
            </fieldset>
            <p className="text-body-1">
              By clicking the Subscribe button, you acknowledge that you have
              read and agree to our
              <a href="#" className="text_on-surface-color link">
                Privacy Policy
              </a>
              and
              <a href="#" className="text_on-surface-color link">
                Terms Of Use
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
