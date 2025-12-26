import Link from "next/link";

import Comment from "@/components/blog-single/Comment";
import RelatedBlogs from "@/components/blog-single/RelatedBlogs";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

import { allBlogs } from "@/data/blogs";
import SocialShare2 from "@/components/blog-single/SocialShare2";
import Sidebar from "@/components/blog-single/Sidebar";
import { notFound } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const post = allBlogs.filter((p) => p.id == id)[0] || allBlogs[0];

  return {
    title:
      post.title + " || Drozy - Modern Blog & Magazine React Nextjs Template",
    description: "Drozy - Modern Blog & Magazine React Nextjs Template",
    openGraph: {
      title:
        post.title + " || Drozy - Modern Blog & Magazine React Nextjs Template",
      description: "Drozy - Modern Blog & Magazine React Nextjs Template",
      type: "article",
      url: `/single-post-1/${post.id}`,
    },
  };
}
export default async function page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const blog = allBlogs.filter((p) => p.id == id)[0];
  if (!blog) {
    return notFound();
  }

  const prevBlog = allBlogs.find((b) => b.id == id - 1) || null;
  const nextBlog = allBlogs.find((b) => b.id == id + 1) || null;

  return (
    <>
      <Header1 />
      <div className="bg-surface2-color">
        <div className="tf-container">
          <ul className="breadcrumb text-caption-1 text_on-surface-color">
            <li>
              <Link href={`/`} className="link">
                Home
              </Link>
            </li>
            <li>
              <Link href={`/categories-1`}>
                {"category" in blog && blog.category
                  ? blog.category
                  : "Life Style"}
              </Link>
            </li>
            <li>{blog.title}</li>
          </ul>
        </div>
      </div>
      <>
        {/* heading-post */}
        <div className="heading-post style-1">
          <div className="tf-container">
            <div className="post-inner">
              <div className="content">
                <div className="wrap-meta-feature d-flex align-items-center">
                  <span className="tag">
                    <a href="#" className="text-title text_white">
                      {"category" in blog && blog.category
                        ? blog.category
                        : "FURNITURES"}
                    </a>
                  </span>
                  <ul className="meta-feature fw-7 d-flex mb_16 text-body-1 mb-0 align-items-center">
                    <li>{blog.date ?? "FEBRUARY 12, 2025"}</li>
                    <li>
                      <span className="text_secodary2-color">POST BY</span>{" "}
                      <a href="#" className="link">
                        {"author" in blog && blog.author
                          ? blog.author
                          : "EMMA CARSON"}
                      </a>
                    </li>
                  </ul>
                </div>
                <h1 className="mb_20">{blog.title}</h1>
                <div className="user-post d-flex align-items-center gap_20">
                  <div className="avatar">
                    <img
                      alt="avatar"
                      src="/images/avatar/avatar-1.jpg"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="fw-7">
                    <span className="text_secodary2-color">Post by</span>{" "}
                    <a href="#" className="link">
                      {"author" in blog && blog.author
                        ? blog.author
                        : "EMMA CARSON"}
                    </a>
                  </p>
                </div>
              </div>
              <div className="thumbs-post">
                <img
                  className="lazyload"
                  alt="thumbs-main"
                  src={
                    "imgSrc" in blog && blog.imgSrc
                      ? blog.imgSrc
                      : "/images/feature-post/thumbs-main-post-1.webp"
                  }
                  style={{ maxHeight: "100vh", objectFit: "contain" }}
                  width={1350}
                  height={1013}
                />
              </div>
            </div>
          </div>
        </div>
        {/* /End heading-post */}
        <div className="main-content">
          {/* single-post */}
          <div className="single-post style-1">
            <div className="tf-container">
              <div className="row">
                <div className="col-lg-2 lg-hide">
                  <div className="share-bar style-1 text-center sticky-top">
                    <h5 className="mb_20">Share This Post</h5>
                    <ul className="d-grid gap_10">
                      <SocialShare2 />
                    </ul>
                  </div>
                </div>
                <div className="col-lg-10">
                  <div className="content-inner">
                    <div className="wrap-post-details">
                      <div className="post-details">
                        <p className="mb_28">
                          In a world that often feels overwhelming, building a
                          joyful and fulfilling life doesn’t have to be
                          complicated. Sometimes, it’s the small, consistent
                          habits that create the biggest impact. Here are 10
                          simple yet powerful habits you can start today to
                          cultivate more happiness and purpose in your everyday
                          life.
                        </p>
                        <div className="passage mb_28">
                          <h5 className="title mb_12">
                            1. Start Your Day With Gratitude.
                          </h5>
                          <p>
                            Start your mornings by writing down three things
                            you're grateful for, no matter how small. End your
                            day by reflecting on one positive moment, even if
                            the day felt challenging. Over time, these bookends
                            of gratitude anchor your days in positivity, build
                            resilience, and increase your overall satisfaction
                            with life.
                          </p>
                        </div>
                        <div className="passage">
                          <h5 className="title mb_12">
                            2. Move Your Body With Joy.
                          </h5>
                          <p className="mb_8">
                            Exercise shouldn’t feel like a chore; it should feel
                            like a celebration of what your body can do. Instead
                            of forcing yourself into rigid workouts you hate,
                            find movement that sparks joy — dancing, hiking,
                            stretching, yoga, or even a playful walk with your
                            dog.
                          </p>
                          <p>
                            Physical activity boosts endorphins, reduces stress,
                            and energizes you from the inside out.
                          </p>
                        </div>
                        <div className="quote text-center">
                          <span className="divider mx-auto" />
                          <p className="h4 mb_16">
                            "Joy Is Not Found In Grand Moments, But In The
                            Quiet, Simple Habits We Nurture Every Day."
                          </p>
                          <a
                            href="#"
                            className="text-title text_secodary-color link fw-7"
                          >
                            John Smith
                          </a>
                        </div>
                        <div className="passage mb_28">
                          <h5 className="title mb_12">
                            3. Create Space For Meaningful Connections.
                          </h5>
                          <p className="mb_8">
                            Human connection is one of the strongest predictors
                            of happiness. In a busy world, it's easy to let true
                            relationships fade. Make a conscious effort to reach
                            out — send that text, schedule that coffee date,
                            write that heartfelt message.
                          </p>
                          <p>
                            Invest in quality over quantity. A few deep,
                            supportive relationships nourish your heart far more
                            than a hundred surface-level ones.
                          </p>
                        </div>
                        <div className="passage">
                          <h5 className="title mb_12">
                            4. Design A Nurturing Environment.
                          </h5>
                          <p className="mb_8">
                            Your environment dramatically influences your mood
                            and mental clarity. Create spaces around you that
                            inspire peace and creativity. Declutter your room,
                            add plants, hang art you love, or light a candle
                            that makes you feel calm.
                          </p>
                          <p>
                            A beautiful, intentional space isn't about
                            perfection — it's about designing surroundings that
                            reflect and support who you want to become.
                          </p>
                        </div>
                        <div className="img-thumbs">
                          <img
                            decoding="async"
                            loading="eager"
                            width={885}
                            height={498}
                            alt="thumbs-post"
                            src="/images/feature-post/thumbs-post-2.webp"
                          />
                        </div>
                        <div className="passage">
                          <h5 className="title mb_12">Final Thoughts.</h5>
                          <p className="mb_8">
                            Happiness doesn’t have to be complicated. By
                            cultivating small, consistent habits that honor your
                            mind, body, and spirit, you naturally create a
                            foundation for a more joyful and fulfilling life.
                          </p>
                          <p>
                            Start with just one habit today — your future self
                            will thank you.
                          </p>
                        </div>
                        <div className="wrap-tag d-flex flex-wrap align-items-center gap_12">
                          <span className="text-title text_on-surface-color fw-7">
                            Tag:
                          </span>
                          <ul className="d-flex flex-wrap gap_12">
                            <li>
                              <a href="#" className="tag text-caption-1">
                                Fashion
                              </a>
                            </li>
                            <li>
                              <a href="#" className="tag text-caption-1">
                                Technology
                              </a>
                            </li>
                            <li>
                              <a href="#" className="tag text-caption-1">
                                Travel List
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="tf-article-navigation">
                          {prevBlog ? (
                            <div className="item prev">
                              <Link
                                href={`/single-post-1/${prevBlog.id}`}
                                className="hover-underline-link text-body-1 text_on-surface-color fw-7 mb_12"
                              >
                                Previous
                              </Link>
                              <h6>
                                <a href="#" className="link line-clamp-2">
                                  How to Stay Productive While Working From
                                  Home.
                                </a>
                              </h6>
                            </div>
                          ) : (
                            ""
                          )}
                          {nextBlog ? (
                            <div className="item next">
                              <Link
                                href={`/single-post-1/${nextBlog.id}`}
                                className="hover-underline-link text-body-1 text_on-surface-color fw-7 mb_12"
                              >
                                Next
                              </Link>
                              <h6>
                                <a href="#" className="link line-clamp-2">
                                  Simple Habits That Will Transform Your Daily.
                                </a>
                              </h6>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <Comment />
                    </div>
                    <Sidebar />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /End single-post */}
          {/* related-post */}
          <RelatedBlogs />
        </div>
      </>

      <Footer1 parentClass="tf-container" />
    </>
  );
}
