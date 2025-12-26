import {
  minimalFeaturePosts,
  productivityPosts,
  simpleFeaturePosts,
} from "@/data/blogs";

import BlogCard1 from "@/components/blog-cards/BlogCard1";

export default function HighlightPosts() {
  return (
    <div className="section-highlight">
      <div className="tf-container">
        <div className="heading-section mb_28">
          <h3 className="title">Highlights</h3>
        </div>
        <div className="tf-grid-layout lg-col-3">
          <div className="col-feature item-grid">
            {simpleFeaturePosts.map((post, index) => (
              <BlogCard1 key={index} post={post} />
            ))}
          </div>
          <div className="col-feature item-grid">
            {minimalFeaturePosts.map((post, index) => (
              <BlogCard1 key={index} post={post} />
            ))}
          </div>
          <div className="col-feature item-grid">
            {productivityPosts.map((post, index) => (
              <BlogCard1 key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
