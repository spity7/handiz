"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface AiTool {
  _id: string;
  title: string;
  category: string;
  link: string;
  order: number;
  thumbnailUrl: string;
  createdAt: string;
}

export default function AiTools() {
  const [aiTools, setAiTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAiTools = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}aiTools`, {
          cache: "no-store",
        });

        const data = await res.json();

        // Optional: sort by order
        const sorted = data.aiTools.sort(
          (a: AiTool, b: AiTool) => a.order - b.order
        );

        setAiTools(sorted);
      } catch (error) {
        console.error("Failed to fetch AI tools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAiTools();
  }, []);

  return (
    <div className="tf-container w-xxl tf-spacing-1 pt-5">
      <div className="heading-section mb_28">
        <h3>AI Tools</h3>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div
          style={{
            minHeight: "260px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div className="spinner" />
          <p className="text-body-1">Loading AI tools…</p>
        </div>
      )}

      {/* CONTENT */}
      {!loading && (
        <div className="tf-grid-layout lg-col-5 md-col-2">
          {aiTools.map((tool) => (
            <div
              className="feature-post-item style-default style-border hover-image-translate"
              key={tool._id}
            >
              <div className="content mb_24">
                {/* <ul className="meta-feature fw-7 d-flex text-caption-2 text-uppercase mb_12">
                <li>{new Date(tool.createdAt).toLocaleDateString()}</li>
                <li>
                  <span className="text_secodary2-color">POST BY</span>
                  <a href="#" className="link">
                    {post.author}
                  </a>
                </li>
              </ul> */}
                <h5 className="title">
                  <Link
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link line-clamp-2"
                  >
                    {tool.title}
                  </Link>
                </h5>
              </div>

              <div className="img-style">
                <Image
                  className="lazyload"
                  decoding="async"
                  loading="lazy"
                  sizes="(max-width: 312px) 100vw, 312px"
                  width={312}
                  height={208}
                  src={tool.thumbnailUrl}
                  alt={tool.title}
                />

                <div className="wrap-tag">
                  <span className="tag categories text-caption-2 text_white">
                    {tool.category}
                  </span>
                  {/* <div className="tag time text-caption-2 text_white">
                  <i className="icon-Timer" /> 4 Mins read
                </div> */}
                </div>
                <Link
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="overlay-link"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
