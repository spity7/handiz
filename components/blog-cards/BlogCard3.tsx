import { BlogPost } from "@/types/blog-post";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard3({ post }: { post: BlogPost }) {
  return (
    <div className="feature-post-item style-line v3 hover-image-translate">
      <div className="img-style">
        {post.imgSrc ? (
          <Image
            className="lazyload"
            loading="lazy"
            width={450}
            height={253}
            alt="feature post"
            src={post.imgSrc}
          />
        ) : (
          ""
        )}
        <Link href={`/single-post-1/${post.id}`} className="overlay-link" />
      </div>
      <div className="content">
        <h5 className="title mb_16">
          <Link
            href={`/single-post-1/${post.id}`}
            className="link line-clamp-2"
          >
            {post.title}
          </Link>
        </h5>
        <div className="wrap-meta d-flex align-items-center gap_9 text-uppercase">
          <div className="wrap-tag">
            <Link
              href={`/categories-1`}
              className="tag categories text-caption-2 text_white"
            >
              {post.category}
            </Link>
          </div>
          <ul className="meta-feature fw-7 d-flex text-caption-2">
            <li>{post.date}</li>
            <li>
              <span className="text_secodary2-color">POST BY</span>
              <a href="#" className="link">
                {post.author}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
