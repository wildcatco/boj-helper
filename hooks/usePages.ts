import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const usePages = ({
  totalPages,
  maxVisiblePages,
}: {
  totalPages: number;
  maxVisiblePages: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  let startPage: number;
  if (totalPages < maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPages - maxVisiblePages + 1);
  }

  let endPage: number;
  if (totalPages < maxVisiblePages) {
    endPage = totalPages;
  } else {
    endPage = Math.min(
      currentPage + Math.floor(maxVisiblePages / 2),
      totalPages
    );
    endPage = Math.max(endPage, maxVisiblePages);
  }

  const pages = [...Array(endPage - startPage + 1).keys()].map(
    (v) => startPage + v
  );

  const prevPage =
    currentPage - maxVisiblePages <= 0 ? 1 : currentPage - maxVisiblePages;

  const nextPage =
    currentPage + maxVisiblePages > totalPages
      ? totalPages
      : currentPage + maxVisiblePages;

  useEffect(() => {
    if (router.isReady) {
      const { page } = router.query;
      if (typeof page === 'string' && page) {
        setCurrentPage(+page);
      } else {
        setCurrentPage(1);
      }
    }
  }, [router]);

  return {
    startPage,
    endPage,
    prevPage,
    nextPage,
    pages,
    currentPage,
    setCurrentPage,
  };
};

export default usePages;
