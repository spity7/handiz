import Link from "next/link";
import Image from "next/image";
import { mediaItems } from "@/data/categories";

export default function Categories() {
  return (
    <div className="section-categories-2">
      <div className="tf-container w-xl">
        <div className="wrap-list">
          {mediaItems.map((item, index) => (
            <Link
              href={`/categories-1`}
              className="media-list-item d-flex align-items-center gap_12"
              key={index}
            >
              <div className="heading-title">
                <h3 className="title">{item.title}</h3>
                <div className="image">
                  <Image
                    decoding="async"
                    loading="lazy"
                    width={400}
                    height={300}
                    alt="feature"
                    src={item.imgSrc}
                  />
                </div>
              </div>
              <span className="h5 number">{item.posts} Posts</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
