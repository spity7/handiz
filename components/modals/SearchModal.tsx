"use client";
import { useProjects } from "@/components/providers/ProjectsProvider";
import SearchModalSkeleton from "@/components/skeletons/SearchModalSkeleton";
import SearchModalFilters from "@/components/modals/SearchModalFilters";
import SearchModalTrending from "@/components/modals/SearchModalTrending";
import { useCallback, useEffect, useState } from "react";

const BODY_CLASS = "search-offcanvas-open";

export default function SearchModal() {
  const { projects, loading, categories, concepts, types } = useProjects();

  const [hasOpened, setHasOpened] = useState(false);
  const [showTrending, setShowTrending] = useState(false);

  useEffect(() => {
    const el = document.getElementById("canvasSearch");
    if (!el) return;

    const onShow = () => {
      setHasOpened(true);
      setShowTrending(true);
      document.body.classList.add(BODY_CLASS);
    };

    const onHidden = () => {
      document.body.classList.remove(BODY_CLASS);
    };

    el.addEventListener("show.bs.offcanvas", onShow);
    el.addEventListener("hidden.bs.offcanvas", onHidden);
    return () => {
      el.removeEventListener("show.bs.offcanvas", onShow);
      el.removeEventListener("hidden.bs.offcanvas", onHidden);
      document.body.classList.remove(BODY_CLASS);
    };
  }, []);

  const closeModal = useCallback(() => {
    const closeBtn = document.getElementById("close-search-modal");
    if (closeBtn) {
      closeBtn.click();
    } else {
      const dismissBtn = document.querySelector(
        '[data-bs-dismiss="offcanvas"]',
      ) as HTMLButtonElement;
      dismissBtn?.click();
    }
  }, []);

  return (
    <div className="offcanvas offcanvas-top offcanvas-search" id="canvasSearch">
      <button
        className="btn-close-search"
        type="button"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      >
        <i className="icon-X" />
      </button>

      <div className="offcanvas-body">
        <div className="tf-container w-xl">
          {!hasOpened ? null : loading ? (
            <SearchModalSkeleton />
          ) : (
            <>
              <SearchModalFilters
                categories={categories}
                concepts={concepts}
                types={types}
                onClose={closeModal}
              />
              {showTrending ? (
                <SearchModalTrending projects={projects} onClose={closeModal} />
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
