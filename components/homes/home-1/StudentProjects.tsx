"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import BlogCard1 from "@/components/blog-cards/BlogCard1";
import StudentProjectCard1 from "@/components/blog-cards/StudentProjectCard1";
import { Project } from "@/types/project";

export default function StudentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.handiz.org/api/v1/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <div
      className="section-most-popular tf-spacing-1"
      style={{ paddingTop: "0px" }}
    >
      <div className="tf-container sw-layout">
        <div className="heading-section d-flex justify-content-between mb_28">
          <h3>Most Popular</h3>

          <div className="wrap-sw-button d-flex gap_12 md-hide">
            <div className="sw-button sz-56 v2 style-cycle nav-prev-layout snbp6">
              <i className="icon-CaretLeft" />
            </div>
            <div className="sw-button sz-56 v2 style-cycle nav-next-layout snbn6">
              <i className="icon-CaretRight" />
            </div>
          </div>
        </div>

        <Swiper
          className="swiper"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd6",
          }}
          navigation={{
            prevEl: ".snbp6",
            nextEl: ".snbn6",
          }}
        >
          {projects.map((project) => (
            <SwiperSlide className="swiper-slide" key={project._id}>
              <StudentProjectCard1 project={project} />
            </SwiperSlide>
          ))}
          <div className="sw-dots sw-pagination-layout mt_22 justify-content-center d-flex d-md-none spd6" />
        </Swiper>
      </div>
    </div>
  );
}
