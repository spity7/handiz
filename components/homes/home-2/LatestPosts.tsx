import Link from "next/link";
import Image from "next/image";
import { latestPosts } from "@/data/blogs";

export default function LatestPosts() {
  return (
    <div className="tf-container w-xxl tf-spacing-1">
      <div className="heading-section mb_28">
        <h3>Latest Posts</h3>
      </div>
      <div className="tf-grid-layout lg-col-4 md-col-2">
        {latestPosts.map((post, index) => (
          <div
            className="feature-post-item style-default style-border hover-image-translate"
            key={index}
          >
            <div className="content mb_24">
              <ul className="meta-feature fw-7 d-flex text-caption-2 text-uppercase mb_12">
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
            <div className="img-style">
              <Image
                className="lazyload"
                decoding="async"
                loading="lazy"
                sizes="(max-width: 312px) 100vw, 312px"
                width={312}
                height={208}
                alt="latest-post"
                src={post.imgSrc}
              />{" "}
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
          </div>
        ))}
      </div>
    </div>
  );
}
