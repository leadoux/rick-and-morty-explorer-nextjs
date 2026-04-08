import Link from "next/link";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

export function PaginationControls({
  currentPage,
  totalPages,
  buildHref,
}: PaginationControlsProps) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav className="pagination" aria-label="Pagination">
      {canGoPrev ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="button button--secondary"
          aria-label={`Go to page ${currentPage - 1}`}
        >
          Previous
        </Link>
      ) : (
        <span className="button button--secondary button--disabled" aria-disabled="true">
          Previous
        </span>
      )}
      <span className="muted pagination__status" aria-live="polite" aria-atomic="true">
        Page {currentPage} of {totalPages}
      </span>
      {canGoNext ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="button button--secondary"
          aria-label={`Go to page ${currentPage + 1}`}
        >
          Next
        </Link>
      ) : (
        <span className="button button--secondary button--disabled" aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}
