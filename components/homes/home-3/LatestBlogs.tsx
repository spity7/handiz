import Link from "next/link";
import Image from "next/image";
import { lineStyleFeatures, lineStyleV2Posts } from "@/data/blogs";

export default function LatestBlogs() {
  return (
    <div className="section-lastest-post-2 tf-spacing-5">
      <div className="tf-container w-xl">
        <div className="heading-section">
          <h3 className="mb_27">Latest Posts</h3>
        </div>
        <div className="row">
          <div className="col-md-6">
            {lineStyleFeatures.map((item, index) => (
              <div
                className="feature-post-item style-line hover-image-translate"
                key={index}
              >
                <div className="img-style mb_24">
                  <Image
                    decoding="async"
                    loading="lazy"
                    width={690}
                    height={388}
                    alt="feature"
                    src={item.imgSrc}
                  />
                  <div className="wrap-tag">
                    <div className="tag time text-caption-2 text_white">
                      <i className="icon-Timer" /> {item.readTime}
                    </div>
                  </div>
                  <Link
                    href={`/single-post-1/${item.id}`}
                    className="overlay-link"
                  />
                </div>
                <div className="content">
                  <h4 className="title mb_12">
                    <Link
                      href={`/single-post-1/${item.id}`}
                      className="link line-clamp-2"
                    >
                      {item.title}
                    </Link>
                  </h4>
                  <p className="text-body-1">{item.excerpt}</p>
                  <div className="wrap-meta d-flex align-items-center gap_12">
                    <Link
                      href={`/categories-1`}
                      className="tag categories text-title text_white"
                    >
                      {item.category}
                    </Link>
                    <ul className="meta-feature fw-7 d-flex text-body-1">
                      <li>{item.date}</li>
                      <li>
                        <span className="text_secodary2-color">POST BY</span>
                        <a href="#" className="link">
                          {item.author}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6">
            {lineStyleV2Posts.map((item, index) => (
              <div
                className="feature-post-item style-line v2 hover-image-translate"
                key={index}
              >
                <div className="img-style">
                  <Image
                    decoding="async"
                    loading="lazy"
                    width={320}
                    height={180}
                    alt="feature"
                    src={item.imgSrc}
                  />
                  <div className="wrap-tag">
                    <div className="tag time text-caption-2 text_white">
                      <i className="icon-Timer" /> {item.readTime}
                    </div>
                  </div>
                  <Link
                    href={`/single-post-1/${item.id}`}
                    className="overlay-link"
                  />
                </div>
                <div className="content">
                  <h5 className="title mb_16">
                    <Link
                      href={`/single-post-1/${item.id}`}
                      className="link line-clamp-2"
                    >
                      {item.title}
                    </Link>
                  </h5>
                  <div className="wrap-meta d-flex align-items-center gap_8 text-uppercase">
                    <Link
                      href={`/categories-1`}
                      className="tag categories text-caption-2 text_white"
                    >
                      {item.category}
                    </Link>
                    <ul className="meta-feature fw-7 d-flex text-caption-2">
                      <li>{item.date}</li>
                      <li>
                        <span className="text_secodary2-color">POST BY</span>
                        <a href="#" className="link">
                          {item.author}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
