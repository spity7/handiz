import Link from "next/link";
import Image from "next/image";
import { listStylePostsV3, numberedPosts } from "@/data/blogs";

export default function HighlightPosts() {
  return (
    <div className="section-highlight-2">
      <div className="tf-container w-xxl">
        <div className="heading-section mb_28">
          <h3>Highlights</h3>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="left">
              {listStylePostsV3.map((post, index) => (
                <div
                  className="feature-post-item style-list v3 style-border hover-image-translate"
                  key={index}
                >
                  <div className="img-style">
                    <Image
                      className="lazyload"
                      decoding="async"
                      loading="lazy"
                      sizes="(max-width: 400px) 100vw, 400px"
                      width={400}
                      height={300}
                      alt="feature post"
                      src={post.imgSrc}
                    />
                    <div className="wrap-tag">
                      <Link
                        href={`/categories-1`}
                        className="tag categories text-caption-2 text_white"
                      >
                        {post.category}
                      </Link>
                      <div className="tag time text-caption-2 text_white">
                        <i className="icon-Timer" /> 4 Mins read
                      </div>
                    </div>
                    <Link
                      href={`/single-post-1/${post.id}`}
                      className="overlay-link"
                    />
                  </div>
                  <div className="content">
                    <ul className="meta-feature fw-7 d-flex mb_12 text-caption-2 text-uppercase">
                      <li>{post.date}</li>
                      <li>
                        <span className="text_secodary2-color">POST BY</span>
                        <a href="#" className="link">
                          {post.author}
                        </a>
                      </li>
                    </ul>
                    <h4 className="title">
                      <Link
                        href={`/single-post-1/${post.id}`}
                        className="link line-clamp-2"
                      >
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-body-1 line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="right">
              {numberedPosts.map((post, index) => (
                <div
                  className="feature-post-item style-has-number hover-image-translate"
                  key={index}
                >
                  {post.hasImage && (
                    <div className="img-style mb_24">
                      <Image
                        className="lazyload"
                        decoding="async"
                        loading="lazy"
                        sizes="(max-width: 444px) 100vw, 444px"
                        width={444}
                        height={333}
                        alt="feature post"
                        src={post.imgSrc}
                      />
                      <div className="wrap-tag">
                        <Link
                          href={`/categories-1`}
                          className="tag categories text-caption-2 text_white"
                        >
                          {post.category}
                        </Link>
                        <div className="tag time text-caption-2 text_white">
                          <i className="icon-Timer" /> 4 Mins read
                        </div>
                      </div>
                      <Link
                        href={`/single-post-1/${post.id}`}
                        className="overlay-link"
                      />
                    </div>
                  )}
                  <div className="content">
                    <span className="number h2">{post.number}</span>
                    <div>
                      <ul className="meta-feature fw-7 d-flex mb_12 text-caption-2 text-uppercase">
                        <li>{post.date}</li>
                        <li>
                          <span className="text_secodary2-color">POST BY</span>
                          <a href="#" className="link">
                            {post.author}
                          </a>
                        </li>
                      </ul>
                      <h5 className="title">
                        <Link
                          href={`/single-post-1/${post.id}`}
                          className="link line-clamp-2"
                        >
                          {post.title}
                        </Link>
                      </h5>
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
