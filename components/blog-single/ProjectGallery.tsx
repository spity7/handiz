"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ProjectGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(-1);

  // Format images for the lightbox
  const slides = images.map((src) => ({ src }));

  return (
    <div className="project-gallery-grid mb_28">
      <h5 className="title mb_12">Project Gallery</h5>
      <div className="row g-3">
        {images.map((imgUrl, idx) => (
          <div key={idx} className="col-6 col-lg-3">
            <div
              className="gallery-item"
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1", // This forces the square shape
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={() => setIndex(idx)}
            >
              <Image
                src={imgUrl}
                alt={`Gallery image ${idx + 1}`}
                fill
                className="rounded"
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: "cover" }} // This ensures the image fills the square without stretching
              />
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </div>
  );
}
