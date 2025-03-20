import { useState, useEffect, useMemo } from "react";

interface UsePaginationProps {
  totalItems: number;
  divider: number;
}

const usePagination = ({ totalItems, divider }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    setTotalPage(Math.ceil(totalItems / divider));
  }, [totalItems, divider]);

  const isFirstPage: boolean = useMemo(() => currentPage === 1, [currentPage]);
  const isLastPage: boolean = useMemo(
    () => currentPage >= totalPage,
    [currentPage, totalPage],
  );

  const pagesToShow = 5;

  const startPage =
    Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPage);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index: number) => startPage + index,
  );

  const handlePrevButton = () => {
    setCurrentPage((prev: number) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextButton = () => {
    setCurrentPage((prev: number) => (prev < totalPage ? prev + 1 : prev));
  };

  const handleFirstButton = () => {
    setCurrentPage(1);
  };

  const handleLastButton = () => {
    setCurrentPage(totalPage);
  };

  return {
    currentPage,
    totalPage,
    isFirstPage,
    isLastPage,
    pageNumbers,
    setCurrentPage,
    handlePrevButton,
    handleNextButton,
    handleFirstButton,
    handleLastButton,
  };
};

export default usePagination;
