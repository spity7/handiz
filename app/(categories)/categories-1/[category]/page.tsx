import Link from "next/link";

import BlogSidebar from "@/components/features/BlogSidebar";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { listPosts, posts } from "@/data/blogs";

import BlogCard1 from "@/components/blog-cards/BlogCard1";
import BlogCard4 from "@/components/blog-cards/BlogCard4";
import { notFound } from "next/navigation";
import Pagination from "@/components/common/Pagination";
function unslugify(slug: string) {
  return slug
    .split("-") // Split by dashes
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join back with spaces
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return {
    title:
      unslugify(category) +
      " || Drozy - Modern Blog & Magazine React Nextjs Template",
    description: "Drozy - Modern Blog & Magazine React Nextjs Template",
    openGraph: {
      title:
        unslugify(category) +
        " || Drozy - Modern Blog & Magazine React Nextjs Template",
      description: "Drozy - Modern Blog & Magazine React Nextjs Template",
      type: "article",
      url: `/categories-1/${category}`,
    },
  };
}
export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;
  const filters = await searchParams;
  const page = Number(filters.page) || 1;

  const filtered = posts.filter((elm) => elm.category == unslugify(category));
  const pages = Math.ceil(filtered.length / 9);
  if (!filtered.length) {
    return notFound();
  }
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
              <li>{unslugify(category)}</li>
            </ul>
          </div>
        </div>
        {/* End breadcrumb */}
        {/* page-title */}
        <div className="page-title style-default">
          <div className="tf-container">
            <div className="title d-flex align-items-center gap_16">
              <h1 className="mb_12">{unslugify(category)}</h1>
              <span className="tag text-caption-1 black-on-dark text_white">
                {filtered.length} article
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
          <div className="grid-features-post tf-spacing-1 pt-0">
            <div className="tf-container">
              <div className="row">
                <div className="col-lg-9">
                  {listPosts.map((post, index) => (
                    <BlogCard4 post={post} key={index} />
                  ))}
                  <span className="tf-line" />
                  {filtered.length ? (
                    <>
                      <div className="tf-grid-layout lg-col-3 md-col-2">
                        {filtered
                          .slice((page - 1) * 9, page * 9)
                          .map((post, index) => (
                            <BlogCard1 key={index} post={post} />
                          ))}
                      </div>
                      {pages > 1 ? (
                        <ul className="wg-pagination d-flex justify-content-center gap_12">
                          <Pagination pages={pages} currentPage={page} />
                        </ul>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <div className="text-center py-5">
                      <h4 className="mb-2">
                        No results found with this category
                      </h4>
                      <p className="text-muted">
                        Try adjusting your filters or search terms.
                      </p>
                    </div>
                  )}
                </div>
                <div className="col-lg-3">
                  <BlogSidebar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <Footer1 />
    </>
  );
}
