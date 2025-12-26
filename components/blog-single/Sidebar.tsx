import { tags } from "@/data/blogCategories";
import { postItems, posts } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";

import BlogCard1 from "../blog-cards/BlogCard1";
import { categoryLinks2 } from "@/data/menu";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__item about text-center">
        <h5 className="sidebar__title">About Write</h5>
        <div className="box-author style-1 sidebar__item">
          <div className="info text-center">
            <div className="avatar mb_30">
              <Image
                alt="avatar"
                src="/images/avatar/main-avatar.jpg"
                width={400}
                height={400}
              />
            </div>
            <h4 className="mb_4">
              <a href="#" className="link">
                Emma Carson
              </a>
            </h4>
            <p className="text-body-1">Portland, Oregon, USA</p>
          </div>
          <ul className="social">
            <li className="text-title fw-7 text_on-surface-color">
              <a href="#" className="d-flex align-items-center gap_12">
                <i className="icon-FacebookLogo" />
                23k Likes
              </a>
            </li>
            <li className="text-title fw-7 text_on-surface-color">
              <a href="#" className="d-flex align-items-center gap_12">
                <i className="icon-XLogo" />
                41k Follower
              </a>
            </li>
            <li className="text-title fw-7 text_on-surface-color">
              <a href="#" className="d-flex align-items-center gap_12">
                <i className="icon-PinterestLogo" />
                32k Follower
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar__item">
        <h5 className="sidebar__title">Categories</h5>
        <ul className="sidebar-categories">
          {categoryLinks2.map(({ href, label, slug }) => (
            <li
              key={label}
              className="item d-flex align-items-center justify-content-between"
            >
              <Link
                className="fw-7 text-body-1 text_on-surface-color"
                href={`${href}/${slug}`}
              >
                {label}
              </Link>
              <span className="number">
                {posts.filter((el) => el.category == label).length}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__item">
        <h5 className="sidebar__title">Relatest Post</h5>
        <div className="wrap-post">
          {postItems.map((post, index) => (
            <BlogCard1 post={post} key={index} />
          ))}
        </div>
      </div>
      <div className="sidebar__item">
        <div className="text-body-3 sidebar__title fw-7 text_on-surface-color">
          Popular Tag
        </div>
        <ul className="list d-flex flex-wrap gap_11">
          {tags.map((tag, index) => (
            <li key={index} className="tag text-caption-1">
              <Link href={`/categories-1`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
