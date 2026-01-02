import Link from "next/link";
import Image from "next/image";
import BlogTags from "@/components/blog-single/BlogTags";
import Comment from "@/components/blog-single/Comment";
import RelatedBlogs from "@/components/blog-single/RelatedBlogs";
import Socialshare from "@/components/blog-single/Socialshare";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { Project } from "@/types/project";
import { allBlogs } from "@/data/blogs";
import { notFound } from "next/navigation";

async function getProject(id: string): Promise<Project | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}projects/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.project;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Handiz`,
    description: project.description?.replace(/<[^>]+>/g, ""),
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) return notFound();

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
              <Link href={"#"}>
                {project.category?.[0] ?? "Student Project"}
              </Link>
            </li>
            <li>{project.title}</li>
          </ul>
        </div>
      </div>

      <div className="heading-post">
        <div className="tf-container">
          <div className="content text-center">
            <div className="wrap-meta-feature d-flex align-items-center justify-content-center">
              <span className="tag">
                <a href="#" className="text-title fw-7 text_white">
                  {project.category?.[0]}
                </a>
              </span>

              <ul className="meta-feature fw-7 d-flex mb_16 text-body-1 mb-0 align-items-center">
                <li>{project.year?.join(", ")}</li>
                <li>
                  <span className="text_secodary2-color">POST BY</span>{" "}
                  <a href="#" className="link">
                    {project.student}
                  </a>
                </li>
              </ul>
            </div>

            <h1 className="mb_16">{project.title}</h1>

            <div className="user-post d-flex align-items-center justify-content-center gap_20">
              <div className="avatar">
                <Image
                  alt="avatar"
                  src={project.thumbnailUrl}
                  width={100}
                  height={100}
                />
              </div>

              <p className="fw-7">
                <span className="text_secodary2-color">Post by</span>{" "}
                <a href="#" className="link">
                  {project.student}
                </a>
              </p>
            </div>
          </div>

          <div className="thumbs-post">
            <Image
              decoding="async"
              loading="eager"
              className="blog-single-image"
              width={1800}
              height={700}
              alt="page-title"
              src={project.thumbnailUrl}
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="single-post">
          <div className="tf-container">
            <div className="row">
              <div className="col-lg-3">
                <div className="share-bar text-center lg-hide sticky-top">
                  <h6 className="mb_20">Share This Post</h6>
                  <ul className="d-grid gap_6">
                    <Socialshare />
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="post-details">
                  <div className="p-3">
                    <ul className="list-unstyled mb-0">
                      <li className="d-flex align-items-center mb-4">
                        <i className="bi bi-people me-3 text-light fs-2"></i>
                        <span className="text-light me-2">Student:</span>
                        <span className="fw-semibold">{project.student}</span>
                      </li>

                      <li className="d-flex align-items-center mb-4">
                        <i className="bi bi-aspect-ratio me-3 text-light fs-2"></i>
                        <span className="text-light me-2">Area:</span>
                        <span className="fw-semibold">
                          {project.area} m<sup>2</sup>
                        </span>
                      </li>

                      <li className="d-flex align-items-center mb-4">
                        <i className="bi bi-tags me-3 text-light fs-2"></i>
                        <span className="text-light me-2">Category:</span>
                        <span className="fw-semibold">
                          {project.category.join(", ")}
                        </span>
                      </li>

                      <li className="d-flex align-items-center mb-4">
                        <i className="bi bi-lightbulb me-3 text-light fs-2"></i>
                        <span className="text-light me-2">Concept:</span>
                        <span className="fw-semibold">
                          {project.concept.join(", ")}
                        </span>
                      </li>

                      <li className="d-flex align-items-center mb-4">
                        <i className="bi bi-calendar-event me-3 text-light fs-2"></i>
                        <span className="text-light me-2">Year:</span>
                        <span className="fw-semibold">
                          {project.year.join(", ")}
                        </span>
                      </li>

                      <li className="d-flex align-items-center mb-4">
                        <i className="bi bi-geo-alt me-3 text-light fs-2"></i>
                        <span className="text-light me-2">Location:</span>
                        <span className="fw-semibold">
                          {project.location.join(", ")}
                        </span>
                      </li>

                      <li className="d-flex align-items-center mb-4">
                        <i className="bi bi-geo-alt me-3 text-light fs-2"></i>
                        <span className="text-light me-2">Type:</span>
                        <span className="fw-semibold">
                          {project.type.join(", ")}
                        </span>
                      </li>

                      <li className="d-flex align-items-center mb-4">
                        <i className="bi bi-geo-alt me-3 text-light fs-2"></i>
                        <span className="text-light me-2">University:</span>
                        <span className="fw-semibold">
                          {project.university.join(", ")}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p
                    className="mb_28"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />

                  {project.contentBlocks?.map((block, index) => {
                    switch (block.type) {
                      case "title":
                        return (
                          <div className="passage mb_28" key={index}>
                            <h5 className="title mb_12">{block.content}</h5>
                          </div>
                        );

                      case "description":
                        return (
                          <div className="passage mb_28" key={index}>
                            <p>{block.content}</p>
                          </div>
                        );

                      case "quote":
                        return (
                          <div className="quote text-center mb_28" key={index}>
                            <span className="divider mx-auto" />
                            <p className="h4 mb_16">"{block.content}"</p>
                          </div>
                        );

                      case "image":
                        return (
                          <div className="img-thumbs mb_28" key={index}>
                            <Image
                              src={block.content}
                              alt="content image"
                              width={885}
                              height={498}
                              className="w-100"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        );

                      default:
                        return null;
                    }
                  })}

                  <div className="wrap-tag d-flex flex-wrap align-items-center gap_12">
                    <span className="text-title text_on-surface-color fw-7">
                      Tag:
                    </span>
                    <ul className="d-flex flex-wrap gap_12">
                      <BlogTags tags={project.concept} />
                    </ul>
                  </div>

                  <h4 className="title mb_24">About The Author</h4>
                  <div className="box-author">
                    <div className="info text-center">
                      <div className="avatar mb_12">
                        <Image
                          alt="avatar"
                          src="/images/avatar/avatar-1.jpg"
                          width={100}
                          height={100}
                        />
                      </div>
                      <h6 className="mb_4">
                        <a href="#" className="link">
                          Emma Carson
                        </a>
                      </h6>
                      <p className="text-caption-1">Portland, USA</p>
                    </div>
                    <div className="content">
                      <p className="mb_20">
                        Emma Carson (@Emma_carson) is a writer who draws. He’s
                        the Bestselling author of The Year. Curabitur aliquam ac
                        arcu in mattis. Phasellus pulvinar erat at aliquam
                        hendrerit. Nam ut velit dolor.
                      </p>
                      <ul className="social">
                        <li className="text-title fw-7 text_on-surface-color">
                          <a
                            href="#"
                            className="d-flex align-items-center gap_12"
                          >
                            <i className="icon-FacebookLogo" />
                            23k Likes
                          </a>
                        </li>
                        <li className="text-title fw-7 text_on-surface-color">
                          <a
                            href="#"
                            className="d-flex align-items-center gap_12"
                          >
                            <i className="icon-XLogo" />
                            41k Follower
                          </a>
                        </li>
                        <li className="text-title fw-7 text_on-surface-color">
                          <a
                            href="#"
                            className="d-flex align-items-center gap_12"
                          >
                            <i className="icon-PinterestLogo" />
                            32k Follower
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Comment />
              </div>
            </div>
          </div>
        </div>
        <RelatedBlogs />
      </div>
      <Footer1 parentClass="tf-container" />
    </>
  );
}
