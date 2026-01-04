"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import RelatedStudentProjectCard1 from "../blog-cards/RelatedStudentProjectCard1";
import { Project } from "@/types/project";

export default function RelatedStudentProjects({
  projects,
}: {
  projects: Project[];
}) {
  if (!projects.length) return null;

  return (
    <div className="tf-container sw-layout tf-spacing-8">
      <h3 className="mb_28">Related Student Projects</h3>

      <Swiper
        className="swiper"
        spaceBetween={15}
        breakpoints={{
          0: { slidesPerView: 1 },
          575: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".spd1",
        }}
      >
        {projects.map((project) => (
          <SwiperSlide className="swiper-slide" key={project._id}>
            <RelatedStudentProjectCard1 project={project} />
          </SwiperSlide>
        ))}

        <div className="sw-dots sw-pagination-layout mt_22 justify-content-center d-flex spd1" />
      </Swiper>
    </div>
  );
}
