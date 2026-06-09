import Image from "next/image";
import Link from "next/link";
import { ProjectListItem } from "@/types/project";

export default function StudentProjectCard1({
  project,
}: {
  project: ProjectListItem;
}) {
  const plainDescription = project.description
    ?.replace(/<[^>]+>/g, "")
    .slice(0, 160);

  return (
    <div className="feature-post-item style-default hover-image-translate">
      <div className="img-style mb_24">
        <Image
          className="lazyload"
          sizes="(max-width: 328px) 100vw, 328px"
          width={328}
          height={246}
          alt={project.title}
          src={project.thumbnailUrl}
          loading="lazy"
          style={{ height: "246px", maxHeight: "246px" }}
        />
        <div className="wrap-tag">
          {project.category?.[0] && (
            <span className="tag categories text-caption-2 text_white">
              {project.category[0]}
            </span>
          )}
          <div className="tag time text-caption-2 text_white">
            {/* <i className="icon-Timer" /> */}
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
            <span className="text_secodary2-color">BY</span>{" "}
            <span className="link">{project.student}</span>
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
        {plainDescription ? (
          <p className="text-body-1 line-clamp-2">{plainDescription}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
