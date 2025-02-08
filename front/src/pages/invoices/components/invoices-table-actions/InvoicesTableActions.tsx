import { Pagination } from "@/components/pagination/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type Props = {
  selectedInvoices: number[];
  textSearch: string;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onChangePage: (page: number) => void;
  setTextSearch: (value: string) => void;
  onOpenMarkAsPaid: () => void;
  onOpenCreateInvoice: () => void;
  onOpenMarkAsUnpaid: () => void;
  onOpenDelete: () => void;
};

export function InvoicesTableActions(props: Props) {
  const {
    currentPage,
    totalItems,
    selectedInvoices,
    textSearch,
    itemsPerPage,
    onChangePage,
    setTextSearch,
    onOpenCreateInvoice,
    onOpenMarkAsPaid,
    onOpenMarkAsUnpaid,
    onOpenDelete,
  } = props;

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Input
            placeholder="Search..."
            value={textSearch}
            onChange={(e) => setTextSearch(e.currentTarget.value)}
          />
        </div>
        <Button variant="outline" onClick={onOpenCreateInvoice}>
          <Plus />
          Create Invoice
        </Button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            disabled={selectedInvoices.length === 0}
            size="sm"
            variant="outline"
            onClick={onOpenMarkAsPaid}
          >
            Mark as paid
          </Button>
          <Button
            disabled={selectedInvoices.length === 0}
            onClick={onOpenMarkAsUnpaid}
            size="sm"
            variant="outline"
          >
            Mark as unpaid
          </Button>
          <Button
            disabled={selectedInvoices.length === 0}
            onClick={onOpenDelete}
            size="sm"
            variant="outline"
          >
            Delete
          </Button>
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            onChangePage={onChangePage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
