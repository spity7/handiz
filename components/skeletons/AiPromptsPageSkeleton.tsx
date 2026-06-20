import ProjectCategoriesSkeleton from "./ProjectCategoriesSkeleton";
import StudentProjectCardSkeleton from "./StudentProjectCardSkeleton";

export default function AiPromptCardSkeleton() {
  return (
    <div className="feature-post-item style-default style-border ai-prompt-card student-project-card-skeleton">
      <div className="img-style">
        <span
          className="skeleton-block student-project-card-skeleton__image"
          style={{ height: "180px", display: "block" }}
        />
        <span
          className="skeleton-block student-project-card-skeleton__tag"
          style={{ position: "absolute", top: "12px", left: "12px" }}
        />
      </div>
      <div className="content mb_24">
        <span className="skeleton-block student-project-card-skeleton__title d-block" />
        <span className="skeleton-block student-project-card-skeleton__text d-block mt-2" />
        <span className="skeleton-block student-project-card-skeleton__text-short d-block mt-2" />
      </div>
    </div>
  );
}

type AiPromptsPageSkeletonProps = {
  cardCount?: number;
};

export function AiPromptsPageSkeleton({
  cardCount = 12,
}: AiPromptsPageSkeletonProps) {
  return (
    <div
      className="ai-prompts-page-skeleton"
      aria-busy="true"
      aria-label="Loading AI prompts"
    >
      <div className="page-title homepage-2 sw-layout ai-prompts-filter-band">
        <div className="tf-container w-xxl pt-5 home-page-skeleton">
          <span className="skeleton-block home-page-skeleton__search d-block" />
          <ProjectCategoriesSkeleton count={4} />
        </div>
      </div>
      <div
        className="section-most-popular tf-spacing-1 ai-prompts-main"
        style={{ paddingTop: 0 }}
      >
        <div className="tf-container sw-layout">
          <div className="heading-section mb_16">
            <h3>AI Prompts</h3>
          </div>
          <div className="tf-grid-layout xl-col-6 lg-col-5 md-col-2 ai-prompts-grid">
            {Array.from({ length: cardCount }, (_, index) => (
              <AiPromptCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
