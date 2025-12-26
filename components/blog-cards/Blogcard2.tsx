import { BlogPost } from "@/types/blog-post";
import Image from "next/image";
import Link from "next/link";

export default function Blogcard2({ post }: { post: BlogPost }) {
  return (
    <div className="feature-post-item style-small d-flex align-items-center hover-image-rotate">
      <Link href={`/single-post-1/${post.id}`} className="img-style">
        {post.imgSrc ? (
          <Image
            decoding="async"
            loading="lazy"
            width={123}
            height={92}
            alt="feature"
            src={post.imgSrc}
          />
        ) : (
          ""
        )}
      </Link>
      <div className="content">
        <ul className="meta-feature text-caption-2 fw-7 text_secodary-color d-flex align-items-center mb_8 text-uppercase">
          <li>{post.date}</li>
          <li>
            <a href="#" className="text-uppercase">
              {post.author}
            </a>
          </li>
        </ul>
        <h6 className="title">
          <Link
            href={`/single-post-1/${post.id}`}
            className="link line-clamp-2"
          >
            {post.title}
          </Link>
        </h6>
      </div>
    </div>
  );
}
