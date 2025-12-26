import Link from "next/link";
import Image from "next/image";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { listItems, moreListItems } from "@/data/about";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About || Drozy - Modern Blog & Magazine React Nextjs Template",
  description: "Drozy - Modern Blog & Magazine React Nextjs Template",
};
export default function page() {
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
            <li>About Us</li>
          </ul>
        </div>
      </div>
      <div className="page-title style-1">
        <div className="tf-container">
          <div className="heading-title text-center">
            <div className="mb_20 text-display-1 fw-7 text_on-surface-color">
              About DROZY
            </div>
            <p className="h5">
              We’re A Passionate Team Of Creatives, Storytellers, And Experts
              <br />
              Committed To Delivering High-Quality, Insightful.
            </p>
          </div>
          <div className="thumbs">
            <Image
              className="lazyload"
              data-src="/images/page-title/page-title-1.jpg"
              alt="thumbs-main"
              src="/images/page-title/page-title-1.jpg"
              width={2700}
              height={1080}
            />
          </div>
        </div>
      </div>
      <div className="main-content">
        {/* about */}
        <div className="tf-container tf-spacing-2 pt-0">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="box-about style-1 tf-grid-layout lg-col-2">
                <div className="left">
                  <h3 className="mb_20 heading">What We Do</h3>
                  <ul className="d-grid list">
                    {listItems.map((item, index) => (
                      <li key={index} className="d-flex gap_12">
                        <h6 className="title">{item.title}</h6>
                        <p className="text-body-1">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="right">
                  <h3 className="mb_20 heading">Our Values</h3>
                  <ul className="d-grid list">
                    {moreListItems.map((item, index) => (
                      <li key={index} className="d-flex gap_12">
                        <h6 className="title">{item.title}</h6>
                        <p className="text-body-1">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End about */}
      </div>

      <Footer1 />
    </>
  );
}
