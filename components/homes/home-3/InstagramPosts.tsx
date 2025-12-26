import Image from "next/image";
import { instagramItems } from "@/data/instagramPosts";

import NewsLetterForm from "@/components/common/NewsLetterForm";

export default function InstagramPosts() {
  return (
    <div id="contact" className="section-instagram-2 section">
      <div className="tf-container w-xl">
        <div className="tf-grid-layout lg-col-2">
          <div className="col-ins tf-grid-layout sm-col-2">
            <div className="ins-item style-1">
              <span className="icon-InstagramLogo icon" />
              <h3 className="title">Follow Us On Instagram</h3>
              <a
                href="#"
                className="hover-underline-link fw-7 text_on-surface-color text-body-1"
              >
                Follow Us
              </a>
            </div>
            {instagramItems.slice(0, 3).map((item, index) => (
              <div className="hover-image-translate" key={index}>
                <a href="#" className="img-style rounded-12 w-100">
                  <Image
                    className="lazyload w-100"
                    loading="lazy"
                    width={330}
                    height={330}
                    alt="instagram"
                    src={item.src}
                  />
                </a>
              </div>
            ))}
          </div>
          <div className="col-ins">
            <div className="tf-grid-layout sm-col-2 mb_30">
              {instagramItems.slice(3).map((item, index) => (
                <div className="hover-image-translate" key={index}>
                  <a href="#" className="img-style rounded-12 w-100">
                    <Image
                      className="lazyload w-100"
                      loading="lazy"
                      width={330}
                      height={330}
                      alt="instagram"
                      src={item.src}
                    />
                  </a>
                </div>
              ))}
              <div className="hover-image-translate">
                <a href="#" className="img-style rounded-12 w-100">
                  <Image
                    className="lazyload w-100"
                    loading="lazy"
                    width={330}
                    height={330}
                    alt="instagram"
                    src="/images/sections/ins-3.webp"
                  />
                </a>
              </div>
            </div>
            <div className="newsletter-item d-flex flex-column justify-content-between">
              <h3 className="title mb_20">Subscribe For All The Top News!</h3>
              <div>
                <NewsLetterForm />
                <div className="box-fieldset-item d-flex">
                  <fieldset className="d-flex gap_12">
                    <input type="checkbox" className="tf-check" id="note" />
                  </fieldset>
                  <p className="text-body-1">
                    By clicking the Subscribe button, you acknowledge that you
                    have read and agree to our
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
        </div>
      </div>
    </div>
  );
}
