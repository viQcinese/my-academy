import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";

type PaginationData = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  withEdgeButtons?: boolean;
};

export function Pagination(props: PaginationData) {
  const {
    currentPage,
    itemsPerPage,
    totalItems,
    onChangePage,
    withEdgeButtons,
  } = props;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const firstItemInPage = (currentPage - 1) * itemsPerPage + 1;
  const lastItemInPage = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-slate-500">
        {firstItemInPage} - {lastItemInPage} of {totalItems} items
      </span>
      {withEdgeButtons && (
        <Button
          className=""
          variant="ghost"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => onChangePage(1)}
        >
          <ChevronsLeftIcon />
        </Button>
      )}
      <Button
        className=""
        variant="ghost"
        size="icon"
        disabled={!hasPreviousPage}
        onClick={() => onChangePage(currentPage - 1)}
      >
        <ChevronLeft />
      </Button>
      <Button
        className=""
        variant="ghost"
        size="icon"
        disabled={!hasNextPage}
        onClick={() => onChangePage(currentPage + 1)}
      >
        <ChevronRight />
      </Button>
      {withEdgeButtons && (
        <Button
          className=""
          variant="ghost"
          size="icon"
          disabled={currentPage === totalPages}
          onClick={() => onChangePage(totalPages)}
        >
          <ChevronsRight />
        </Button>
      )}
    </div>
  );
}
