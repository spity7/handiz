import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div id="about" className="section-about tf-spacing-4 section">
      <div className="tf-container w-xl">
        <div className="row">
          <div className="col-sm-8">
            <div className="heading-section mb_40">
              <div className="title text-display-2 fw-7 text_on-surface-color font-2 animationtext clip">
                Hi, I’m Emma Carson <br />A Passionate Blogger &amp;
                <span className="tf-text s1 cd-words-wrapper">
                  <span className="item-text is-visible">Storyteller</span>
                  <span className="item-text is-hidden">Narrator</span>
                </span>
              </div>
            </div>
            <Link
              href={`/about`}
              className="tf-btn animate-hover-btn btn-switch-text"
            >
              <span>
                <span className="btn-double-text" data-text="About Me">
                  About Me
                </span>
              </span>
            </Link>
          </div>
          <div className="col-sm-4 text-sm-end">
            <div className="text-title fw-7 text_on-surface-color mb_20">
              WHAT I AM DOING
            </div>
            <ul className="list-work">
              <li className="h4">
                <a href="#" className="link">
                  Photographer
                </a>
              </li>
              <li className="h4">
                <a href="#" className="link">
                  Lifestyle Blogger
                </a>
              </li>
              <li className="h4">
                <a href="#" className="link">
                  Content Creator
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
