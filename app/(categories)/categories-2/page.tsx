import Link from "next/link";
import Image from "next/image";
import BlogSidebar from "@/components/features/BlogSidebar";
import CategoriSlider from "@/components/features/CategoriSlider";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { featurePosts3 } from "@/data/blogs";

import BlogCard4 from "@/components/blog-cards/BlogCard4";
import Pagination from "@/components/common/Pagination";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Categories 02 || Drozy - Modern Blog & Magazine React Nextjs Template",
  description: "Drozy - Modern Blog & Magazine React Nextjs Template",
};
export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = await searchParams;
  const page = Number(filters.page) || 1;
  const pages = Math.ceil(featurePosts3.length / 4);
  return (
    <>
      <Header1 />
      <>
        {/* breadcrumb */}
        <div className="bg-surface2-color">
          <div className="tf-container">
            <ul className="breadcrumb text-caption-1 text_on-surface-color">
              <li>
                <Link href={`/`} className="link">
                  Home
                </Link>
              </li>
              <li>Categories</li>
              <li>Life Style</li>
            </ul>
          </div>
        </div>
        {/* End breadcrumb */}
        {/* page-title */}
        <div className="page-title style-default">
          <div className="tf-container">
            <div className="title d-flex align-items-center gap_16">
              <h1 className="mb_12">Life Style</h1>
              <span className="tag text-caption-1 black-on-dark text_white">
                30 article
              </span>
            </div>
            <p>
              Your destination for discovering new ways to enhance your
              lifestyle from mindful living and travel <br />
              adventures to style, wellness, and beyond.
            </p>
          </div>
        </div>
        <div className="main-content">
          <div className="list-features-post sw-layout pt-0 tf-spacing-1">
            <div className="tf-container">
              <CategoriSlider />
              <div className="row">
                <div className="col-lg-9">
                  <div>
                    {featurePosts3
                      .slice((page - 1) * 4, page * 4)
                      .map((post, index) => (
                        <BlogCard4 post={post} key={index} />
                      ))}
                  </div>
                  {pages > 1 ? (
                    <ul className="wg-pagination d-flex gap_12">
                      <Pagination pages={pages} currentPage={page} />
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-lg-3">
                  <BlogSidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer1 />
      </>
    </>
  );
}
