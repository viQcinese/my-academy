import { ITEMS_PER_PAGE } from "@/constants/pagination";
import { useState } from "react";

type Params<T> = {
  data: T[];
  onChangePage?: () => void;
  itemsPerPage?: number;
};

export function useStaticPagination<T>(params: Params<T>) {
  const { data, onChangePage, itemsPerPage = ITEMS_PER_PAGE } = params;
  const [currentPage, setCurrentPage] = useState(1);

  function handleChangePage(page: number) {
    setCurrentPage(page);
    onChangePage?.();
  }

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(start, start + itemsPerPage);

  return {
    currentPage,
    paginatedData,
    totalItems: data.length,
    onChangePage: handleChangePage,
  };
}
