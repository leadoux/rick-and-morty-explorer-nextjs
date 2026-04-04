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
    <div className="pagination">
      {canGoPrev ? (
        <Link href={buildHref(currentPage - 1)} className="button">
          Previous
        </Link>
      ) : (
        <span className="button button--disabled">Previous</span>
      )}
      <span className="muted">
        Page {currentPage} of {totalPages}
      </span>
      {canGoNext ? (
        <Link href={buildHref(currentPage + 1)} className="button">
          Next
        </Link>
      ) : (
        <span className="button button--disabled">Next</span>
      )}
    </div>
  );
}
