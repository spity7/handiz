import Link from "next/link";
import Image from "next/image";
import { lineStyleV4Posts, positionStylePosts } from "@/data/blogs";

export default function EditorsPic() {
  return (
    <div className="section-editor-pick-3 tf-spacing-6">
      <div className="tf-container w-xl">
        <div className="heading-section">
          <h3 className="mb_26">Editor Pick's</h3>
        </div>
        <div className="row">
          <div className="col-lg-6">
            {positionStylePosts.map((item, index) => (
              <div
                className="feature-post-item style-position hover-image-translate item-grid"
                key={index}
              >
                <div className="img-style">
                  <Image
                    decoding="async"
                    loading="lazy"
                    width={690}
                    height={690}
                    alt="feature"
                    src={item.imgSrc}
                  />
                  <Link
                    href={`/single-post-1/${item.id}`}
                    className="overlay-link"
                  />
                </div>
                <div className="content">
                  <div className="heading-title">
                    <h4 className="title mb_12 text_white">
                      <Link href={`/single-post-1/${item.id}`} className="link">
                        {item.title}
                      </Link>
                    </h4>
                    <p className="text-body-1 text_white">{item.excerpt}</p>
                  </div>
                  <div className="wrap-meta d-flex align-items-center gap_12">
                    <Link
                      href={`/categories-1`}
                      className="tag categories text-title text_white"
                    >
                      {item.category}
                    </Link>
                    <ul className="meta-feature fw-7 d-flex text-body-1 text_white">
                      <li>{item.date}</li>
                      <li>
                        <span>POST BY</span>
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
          <div className="col-lg-6">
            <div className="tf-grid-layout sm-col-2 wrap-feature">
              {lineStyleV4Posts.map((item, index) => (
                <div
                  className="feature-post-item style-line v4 hover-image-translate item-grid"
                  key={index}
                >
                  <div className="img-style mb_20">
                    <Image
                      decoding="async"
                      loading="lazy"
                      width={330}
                      height={186}
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
                    <h5 className="title">
                      <Link
                        href={`/single-post-1/${item.id}`}
                        className="link line-clamp-2"
                      >
                        {item.title}
                      </Link>
                    </h5>
                    <div className="wrap-meta d-flex align-items-center gap_12 text-uppercase">
                      <Link
                        href={`/categories-1`}
                        className="tag categories text-caption-2 text_white"
                      >
                        {item.category}
                      </Link>
                      <ul className="meta-feature fw-7 d-flex text-caption-2">
                        <li>{item.date}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
