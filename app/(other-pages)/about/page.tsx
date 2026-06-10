import Link from "next/link";
import Socialshare from "@/components/blog-single/Socialshare";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import ContentBlocks from "@/components/common/ContentBlocks";
import type { AboutUs } from "@/types/aboutUs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About || HANDIZ",
  description: "Learn more about HANDIZ",
};

async function getAboutUs(): Promise<AboutUs | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}about-us`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.aboutUs ?? null;
  } catch {
    return null;
  }
}

export default async function AboutPage() {
  const aboutUs = await getAboutUs();

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
      <div className="page-title style-1 pb-0 pt-0">
        <div className="tf-container">
          <div className="heading-title text-center mb-sm-5 mb-3">
            <div className="mb_0 text-display-1 fw-7 text_on-surface-color">
              Arab Architecture Platform
            </div>
          </div>
        </div>
      </div>
      <div className="main-content single-post">
        <div className="tf-container tf-spacing-2 pt-0">
          <div className="row">
            <div className="col-lg-2 mt-5">
              <div className="share-bar text-center lg-hide sticky-top">
                <h5 className="mb_20">Follow Us</h5>
                <ul className="d-grid gap_6">
                  <Socialshare />
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              {aboutUs?.contentBlocks?.length ? (
                <ContentBlocks blocks={aboutUs.contentBlocks} />
              ) : (
                <p className="text-body-1 text-center">
                  About content is coming soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  );
}
