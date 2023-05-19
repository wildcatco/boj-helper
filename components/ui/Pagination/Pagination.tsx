import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';

import usePages from '@/hooks/usePages';
import { getQueryString } from '@/libs/utils/query-string';

import styles from './Pagination.module.scss';

interface PaginationProps {
  totalPages: number;
  maxVisiblePages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  maxVisiblePages,
}) => {
  const router = useRouter();
  const { startPage, endPage, prevPage, nextPage, pages, currentPage } =
    usePages({
      totalPages,
      maxVisiblePages,
    });

  const getHref = (page: number) => {
    const query = { ...router.query };
    query['page'] = page > 1 ? page + '' : '';
    const queryString = getQueryString(query);
    return `${router.pathname}${queryString ? '?' + queryString : ''}`;
  };

  return (
    <div className={styles.pagination}>
      <ArrowButton type="start" visible={startPage !== 1} href={getHref(1)} />
      <ArrowButton
        type="prev"
        visible={startPage !== 1}
        href={getHref(prevPage)}
      />
      <PageButtonList
        pages={pages}
        currentPage={currentPage}
        getHref={getHref}
      />
      <ArrowButton
        type="next"
        visible={endPage < totalPages}
        href={getHref(nextPage)}
      />
      <ArrowButton
        type="end"
        visible={endPage < totalPages}
        href={getHref(totalPages)}
      />
    </div>
  );
};

interface ArrowButtonProps {
  type: 'start' | 'prev' | 'next' | 'end';
  visible: boolean;
  href: string;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ type, visible, href }) => {
  const icon = {
    start: <HiChevronDoubleLeft />,
    prev: <HiChevronLeft />,
    next: <HiChevronRight />,
    end: <HiChevronDoubleRight />,
  };
  return (
    <div
      style={{ cursor: 'pointer', visibility: visible ? 'visible' : 'hidden' }}
    >
      <Link href={href}>{icon[type]}</Link>
    </div>
  );
};

interface PageButtonListProps {
  pages: number[];
  currentPage: number;
  getHref: (page: number) => string;
}

const PageButtonList: React.FC<PageButtonListProps> = ({
  pages,
  currentPage,
  getHref,
}) => {
  return (
    <div className={styles.pageButtonList}>
      {pages.map((page) => (
        <PageButton
          key={page}
          page={page}
          active={currentPage === page}
          href={getHref(page)}
        />
      ))}
    </div>
  );
};

interface PageButtonProps {
  active: boolean;
  page: number;
  href: string;
}

const PageButton: React.FC<PageButtonProps> = ({ active, page, href }) => {
  return (
    <Link
      href={href}
      className={`${styles.pageButton} ${active && styles.activePage}`}
    >
      {page}
    </Link>
  );
};

export default Pagination;
