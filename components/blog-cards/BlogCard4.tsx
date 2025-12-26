import { BlogPost } from "@/types/blog-post";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard4({ post }: { post: BlogPost }) {
  return (
    <div className="feature-post-item style-list hover-image-translate">
      <div className="img-style w-100">
        {post.imgSrc ? (
          <Image
            className="lazyload w-100"
            decoding="async"
            loading="lazy"
            src={post.imgSrc}
            sizes="(max-width: 651px) 100vw, 651px"
            width={651}
            height={367}
            alt="feature post"
          />
        ) : (
          ""
        )}
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
        <Link href={`/single-post-1/${post.id}`} className="overlay-link" />
      </div>
      <div className="content">
        <div className="heading">
          <ul className="meta-feature fw-7 d-flex mb_16 text-body-1">
            <li>{post.date}</li>
            <li>
              <span className="text_secodary2-color">POST BY</span>{" "}
              <a href="#" className="link">
                {post.author}
              </a>
            </li>
          </ul>
          <h3 className="title">
            <Link href={`/single-post-1/${post.id}`} className="link">
              {post.title}
            </Link>
          </h3>
          <p className="text-body-1 blog-card-4-desc">{post.excerpt}</p>
        </div>
        <Link
          href={`/single-post-1/${post.id}`}
          className="hover-underline-link text-body-1 fw-7 text_on-surface-color"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
