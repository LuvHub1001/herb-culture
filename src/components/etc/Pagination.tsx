import { useEffect } from "react";
import { usePagination } from "../../hooks";

interface PaginationProps {
  totalItems: number;
  divider: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalItems, divider, onPageChange }: PaginationProps) {
  const {
    currentPage,
    isFirstPage,
    isLastPage,
    pageNumbers,
    handlePrevButton,
    handleNextButton,
    handleFirstButton,
    handleLastButton,
    setCurrentPage,
  } = usePagination({ totalItems, divider });

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  return (
    <div className="flex mt-20 w-screen h-7 justify-center items-center gap-3">
      <img
        src="/assets/images/arrow_back2.svg"
        className={`cursor-pointer ${
          isFirstPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={!isFirstPage ? handleFirstButton : undefined}
      />

      <img
        src="/assets/images/arrow_back1.svg"
        className={`cursor-pointer ${
          isFirstPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={!isFirstPage ? handlePrevButton : undefined}
      />

      <div className="flex gap-2">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`border-2 rounded-4xl w-8 h-8 cursor-pointer text-center ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <img
        src="/assets/images/arrow_front1.svg"
        className={`cursor-pointer ${
          isLastPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={isLastPage ? undefined : handleNextButton}
      />

      <img
        src="/assets/images/arrow_front2.svg"
        className={`cursor-pointer ${
          isLastPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={isLastPage ? undefined : handleLastButton}
      />
    </div>
  );
}

export default Pagination;
