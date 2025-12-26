"use client";
import Link from "next/link";

import { postItems, posts } from "@/data/blogs";

import { tags } from "@/data/blogCategories";
import BlogCard1 from "../blog-cards/BlogCard1";
import { categoryLinks2 } from "@/data/menu";
import BlogSearchForm from "./BlogSearchForm";

export default function BlogSidebar() {
  return (
    <div className="sidebar">
      <BlogSearchForm />
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
