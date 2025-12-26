import Link from "next/link";
import Image from "next/image";
import { instagramImages } from "@/data/instagramPosts";

export default function InstagramPosts() {
  return (
    <div className="section-instagram tf-spacing-3">
      <div className="tf-container w-xxl">
        <div className="tf-grid-layout lg-col-5 md-col-4 tf-col-2">
          <div className="ins-item">
            <span className="icon-InstagramLogo icon" />
            <h4 className="title">Follow Us On Instagram</h4>
            <a
              href="#"
              className="hover-underline-link fw-7 text_on-surface-color text-body-1"
            >
              Follow Us
            </a>
          </div>
          {instagramImages.map((img, index) => (
            <div
              className={`hover-image-translate ${img.extraClass || ""}`}
              key={index}
            >
              <a href="#" className="img-style rounded-16 w-100">
                <Image
                  className="lazyload w-100"
                  decoding="async"
                  loading="lazy"
                  sizes="(max-width: 288px) 100vw, 288px"
                  width={288}
                  height={288}
                  alt="feature post"
                  src={img.src}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
