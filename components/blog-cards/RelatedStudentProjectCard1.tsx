import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";

export default function RelatedStudentProjectCard1({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="feature-post-item style-default hover-image-translate">
      <div className="img-style mb_24">
        <Image
          className="lazyload"
          style={{ height: "312px" }}
          sizes="(max-width: 328px) 100vw, 328px"
          width={328}
          height={246}
          alt={project.title}
          src={project.thumbnailUrl}
        />
        <div className="wrap-tag">
          <span className="tag categories text-caption-2 text_white">
            {project.category?.[0]}
          </span>

          <div className="tag time text-caption-2 text_white">
            {project.concept?.[0]}
          </div>
        </div>

        <Link
          href={`/student-project/${project._id}`}
          className="overlay-link"
        />
      </div>

      <div className="content">
        <ul className="meta-feature fw-7 d-flex text-caption-2 text-uppercase mb_12">
          <li>{project.year?.[0]}</li>
          <li>
            <span className="text_secodary2-color">BY</span> {project.student}
          </li>
        </ul>

        <h5 className="title">
          <Link
            href={`/student-project/${project._id}`}
            className="line-clamp-2 link"
          >
            {project.title}
          </Link>
        </h5>
      </div>
    </div>
  );
}
