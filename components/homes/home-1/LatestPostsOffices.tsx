import NewsLetterForm from "@/components/common/NewsLetterForm";
import OfficeCard1 from "@/components/offices/OfficeCard1";
import { Office } from "@/types/office";

export default function LatestPostsOffices({ offices }: { offices: Office[] }) {
  return (
    <div className="tf-container tf-spacing-1">
      <div className="heading-section mb_28">
        <h3 className="title">Arch Offices</h3>
      </div>
      <div className="tf-grid-layout xxl-col-6 xl-col-5 lg-col-4 md-col-3 sm-col-2">
        {offices &&
          offices.map((office, index) => (
            <OfficeCard1 key={index} office={office} />
          ))}
        {/* <div className="newsletter-item d-flex flex-column justify-content-between">
          <h4 className="mb_20">
            Subscribe Now To Stay Updated With Top News!
          </h4>
          <div>
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
        </div> */}
      </div>
    </div>
  );
}
