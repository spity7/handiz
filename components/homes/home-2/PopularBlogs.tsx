import Link from "next/link";
import Image from "next/image";
import { gridPosts2, mainFeaturePosts } from "@/data/blogs";

export default function PopularBlogs() {
  return (
    <div className="section-most-popular-2">
      <div className="tf-container w-xxl tf-spacing-1">
        <div className="heading-section mb_26">
          <h3>Most Popular</h3>
        </div>
        <div className="row">
          {mainFeaturePosts.map((mainPost) => {
            const relatedGridPosts = gridPosts2.filter(
              (gridPost) => gridPost.parentId === mainPost.id
            );

            return (
              <div className="col-lg-6" key={mainPost.id}>
                <div className="feature-post-item style-default style-border hover-image-translate">
                  <div className="content mb_28">
                    <div className="wrap-meta d-flex justify-content-between mb_16">
                      <ul className="meta-feature fw-7 d-flex text-body-1">
                        <li>{mainPost.date}</li>
                        <li>
                          <span className="text_secodary2-color">POST BY</span>
                          <a href="#" className="link">
                            {mainPost.author}
                          </a>
                        </li>
                      </ul>
                      <ul className="meta-feature interact fw-7 d-flex text-body-1">
                        <li>
                          <i className="icon-Eye" />
                          {mainPost.views}
                        </li>
                        <li>
                          <i className="icon-ChatsCircle" />
                          {mainPost.comments}
                        </li>
                      </ul>
                    </div>
                    <h2 className="title">
                      <Link
                        href={`/single-post-1/${mainPost.id}`}
                        className="link line-clamp-2"
                      >
                        {mainPost.title}
                      </Link>
                    </h2>
                  </div>
                  <div className="img-style mb_28">
                    <Image
                      className="lazyload"
                      decoding="async"
                      loading="lazy"
                      sizes="(max-width: 709px) 100vw, 709px"
                      width={709}
                      height={473}
                      alt="feature post"
                      src={mainPost.imgSrc}
                    />{" "}
                    <div className="wrap-tag">
                      <Link
                        href={`/categories-1`}
                        className="tag categories text-caption-2 text_white"
                      >
                        {mainPost.category}
                      </Link>
                      <div className="tag time text-caption-2 text_white">
                        <i className="icon-Timer" /> 4 Mins read
                      </div>
                    </div>
                    <Link
                      href={`/single-post-1/${mainPost.id}`}
                      className="overlay-link"
                    />
                  </div>
                  <p>{mainPost.description}</p>
                </div>

                <div className="tf-grid-layout md-col-2">
                  {relatedGridPosts.map((grid, idx) => (
                    <div
                      className="feature-post-item style-default style-border hover-image-translate"
                      key={idx}
                    >
                      <div className="content">
                        <div className="wrap-meta d-flex justify-content-between mb_12">
                          <ul className="meta-feature fw-7 d-flex text-caption-2 text-uppercase">
                            <li>{grid.date}</li>
                            <li>
                              <span className="text_secodary2-color">
                                POST BY
                              </span>
                              <a href="#" className="link">
                                {grid.author}
                              </a>
                            </li>
                          </ul>
                        </div>
                        <h5 className="title mb_16">
                          <Link
                            href={`/single-post-1/${grid.id}`}
                            className="link"
                          >
                            {grid.title}
                          </Link>
                        </h5>
                        <p className="text-body-1">{grid.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
