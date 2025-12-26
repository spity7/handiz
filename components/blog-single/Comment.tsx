import Image from "next/image";
import CommentForm from "./CommentForm";

export default function Comment() {
  return (
    <>
      {" "}
      <div className="reply-comment">
        <h4 className="mb_24">03 Comments</h4>
        <div className="reply-comment-wrap">
          <div className="reply-comment-item">
            <div className="avatar">
              <Image
                alt="avatar"
                src="/images/avatar/avatar-2.jpg"
                width={120}
                height={120}
              />
            </div>
            <div className="content">
              <div className="info mb_8">
                <h6 className="name mb_4">
                  <a href="#" className="link">
                    Guy Hawkins{" "}
                  </a>
                  <i className="icon-CheckCircle" />
                </h6>
                <p className="text-caption-1">August 13, 2025</p>
              </div>
              <p className="comment text-body-1 mb_8">
                Lorem ipsum dolor sit amet consectetur. Cursus nunc pharetra
                arcu quam turpis risus amet turpis. Facilisis elementum
                tincidunt pellentesque sed rutrum enim.
              </p>
              <a
                href="#reply"
                className="hover-line-text fw-7 text_on-surface-color text-body-1"
              >
                Reply
              </a>
            </div>
          </div>
          <div className="reply-comment-item style-rep">
            <div className="avatar">
              <Image
                alt="avatar"
                src="/images/avatar/avatar-3.jpg"
                width={120}
                height={120}
              />
            </div>
            <div className="content">
              <div className="info mb_8">
                <h6 className="name mb_4">
                  <a href="#" className="link">
                    Eleanor Pena{" "}
                  </a>
                  <i className="icon-CheckCircle" />
                </h6>
                <p className="text-caption-1">August 13, 2025</p>
              </div>
              <p className="comment text-body-1">
                Great choice of Acronym AF1’s
              </p>
            </div>
          </div>
        </div>
        <div className="reply-comment-wrap">
          <div className="reply-comment-item">
            <div className="avatar">
              <Image
                alt="avatar"
                src="/images/avatar/avatar-4.jpg"
                width={120}
                height={120}
              />
            </div>
            <div className="content">
              <div className="info mb_8">
                <h6 className="name mb_4">
                  <a href="#" className="link">
                    Jerome Bell{" "}
                  </a>
                  <i className="icon-CheckCircle" />
                </h6>
                <p className="text-caption-1">August 13, 2025</p>
              </div>
              <p className="comment text-body-1 mb_8">
                Lorem ipsum dolor sit amet consectetur. Cursus nunc pharetra
                arcu quam turpis risus amet turpis. Facilisis elementum
                tincidunt pellentesque sed rutrum enim.
              </p>
              <a
                href="#reply"
                className="hover-line-text fw-7 text_on-surface-color text-body-1"
              >
                Reply
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="leave-comment" id="reply">
        <div className="heading-title mb_41">
          <h4 className="mb_24">Leave A Comment</h4>
        </div>
        <CommentForm />
      </div>
    </>
  );
}
