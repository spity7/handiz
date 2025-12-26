import Link from "next/link";
import Image from "next/image";
import { highlightPosts, relatedPosts } from "@/data/blogs";

import BlogCard3 from "@/components/blog-cards/BlogCard3";

export default function HighlightBlogs() {
  return (
    <div className="section-highlight-3 tf-spacing-1">
      <div className="tf-container w-xl">
        <div className="heading-section mb_28">
          <h3>Highlights</h3>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="left">
              {highlightPosts.map((item, index) => (
                <BlogCard3 post={item} key={index} />
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="right">
              <h5 className="mb_28">Relatest</h5>
              {relatedPosts.map((post, index) => (
                <div
                  key={index}
                  className={`feature-post-item ${
                    post.style === "large"
                      ? "style-line v4"
                      : "style-small v2 d-flex align-items-center"
                  } hover-image-rotate item-grid`}
                >
                  <Link
                    href={`/single-post-1/${post.id}`}
                    className={`img-style ${
                      post.style === "large" ? "w-100 mb_20" : ""
                    } `}
                  >
                    <Image
                      loading="lazy"
                      className="w-100"
                      width={post.style === "large" ? 392 : 120}
                      height={post.style === "large" ? 221 : 120}
                      alt="feature"
                      src={post.imgSrc}
                    />
                    {post.style === "large" && (
                      <div className="wrap-tag">
                        <div className="tag time text-caption-2 text_white">
                          <i className="icon-Timer" /> 4 Mins read
                        </div>
                      </div>
                    )}
                    <span className="overlay-link" />
                  </Link>
                  <div className="content">
                    <h6
                      className={`title ${
                        post.style === "large" ? "" : "mb_12"
                      }`}
                    >
                      <Link
                        href={`/single-post-1/${post.id}`}
                        className="link line-clamp-2"
                      >
                        {post.title}
                      </Link>
                    </h6>
                    <div
                      className={`wrap-meta d-flex align-items-center ${
                        post.style === "large"
                          ? "gap_8 text-uppercase"
                          : "gap_8"
                      }`}
                    >
                      <Link
                        href={`/categories-1`}
                        className={`tag categories text-caption-2 text_white`}
                      >
                        {post.category}
                      </Link>
                      <ul className="meta-feature fw-7 d-flex text-caption-2 text_secodary-color text-uppercase">
                        <li>{post.date}</li>
                        {post.author && (
                          <li>
                            <span className="text_secodary2-color">
                              POST BY
                            </span>
                            <a href="#" className="link">
                              {post.author}
                            </a>
                          </li>
                        )}
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
