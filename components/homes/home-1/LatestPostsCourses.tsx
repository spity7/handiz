import { courses } from "@/data/blogs";
import NewsLetterForm from "@/components/common/NewsLetterForm";
import CourseCard1 from "@/components/courses/CourseCard1";

export default function LatestPostsCourses() {
  return (
    <div className="tf-container tf-spacing-1">
      <div className="heading-section mb_28">
        <h3 className="title">Latest Posts</h3>
      </div>
      <div className="tf-grid-layout xxl-col-4 sm-col-2">
        {courses.map((post, index) => (
          <CourseCard1 key={index} post={post} />
        ))}
        <div className="newsletter-item d-flex flex-column justify-content-between">
          <h4 className="mb_20">
            Subscribe Now To Stay Updated With Top News!
          </h4>
          <div>
            <NewsLetterForm />
            <div className="box-fieldset-item d-flex">
              <fieldset className="d-flex gap_12">
                <input type="checkbox" className="tf-check" />
              </fieldset>
              <p className="text-body-1">
                By clicking the Subscribe button, you acknowledge that you have
                read and agree to our
                <a href="#" className="text_on-surface-color link">
                  Privacy Policy
                </a>
                and
                <a href="#" className="text_on-surface-color link">
                  Terms Of Use
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
