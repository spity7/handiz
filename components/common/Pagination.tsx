"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type PaginationProps = {
  currentPage: number;
  pages?: number;
};

export default function Pagination({
  currentPage,
  pages = 3,
}: PaginationProps) {
  const totalPages = pages;
  const pathname = usePathname();
  const router = useRouter();

  const onPageChange = useCallback(
    (page: number) => {
      router.push(`${pathname}?page=${page}`);
    },
    [pathname, router]
  );

  const handlePrev = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    },
    [currentPage, onPageChange]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    },
    [currentPage, totalPages, onPageChange]
  );

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <>
      <li>
        <a
          href="#"
          onClick={handlePrev}
          aria-label="Previous Page"
          aria-disabled={currentPage === 1}
          className={currentPage === 1 ? "disabled" : ""}
        >
          <i className="icon-CaretLeft" />
        </a>
      </li>

      {pageNumbers.map((page) => (
        <li key={page} className={currentPage === page ? "active" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page);
            }}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </a>
        </li>
      ))}

      <li>
        <a
          href="#"
          onClick={handleNext}
          aria-label="Next Page"
          aria-disabled={currentPage === totalPages}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          <i className="icon-CaretRight" />
        </a>
      </li>
    </>
  );
}
