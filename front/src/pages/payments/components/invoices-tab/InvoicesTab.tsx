import { useSelectMany } from "@/hooks/useSelectMany";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useStaticPagination } from "@/hooks/useStaticPagination";
import { InvoiceTableItem } from "@/model/Invoice";
import { getInvoices } from "@/api/invoices/getInvoices";
import { InvoicesTableActions } from "../invoices-table-actions/InvoicesTableActions";
import { InvoicesTable } from "../invoices-table/InvoicesTable";
import { Student } from "@/model/Student";
import { getStudents } from "@/api/student/getStudents";
import { MarkAsPaidDialog } from "../../dialogs/mark-as-paid/MarkAsPaidDialog";
import { MarkAsUnpaidDialog } from "../../dialogs/mark-as-unpaid/MarkAsUnpaidDialog";
import { CreateInvoiceDialog } from "../../dialogs/create-invoice/CreateInvoiceDialog";

const ITEMS_PER_PAGE = 50;

export function InvoicesTab() {
  const { data: students } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const { data } = useQuery<InvoiceTableItem[]>({
    queryFn: () => getInvoices(students || []),
    queryKey: ["invoices"],
    enabled: !!students,
  });

  const invoiceIds = data?.map((invoice) => invoice.invoice.id) || [];
  const [selectedInvoices, onToggleInvoice, onToggleAllInvoices] =
    useSelectMany(invoiceIds);
  const [textSearch, setTextSearch] = useState("");
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [isMarkAsPaidOpen, setIsMarkAsPaidOpen] = useState(false);
  const [isMarkAsUnpaidOpen, setIsMarkAsUnpaidOpen] = useState(false);

  const { currentPage, onChangePage, paginatedData, totalItems } =
    useStaticPagination({
      data: data ?? [],
      onChangePage: () => onToggleAllInvoices(false),
      itemsPerPage: ITEMS_PER_PAGE,
    });

  function onClearSelection() {
    onToggleAllInvoices(false);
  }

  useEffect(() => {
    document.title = "Zygurat | Payments";
  }, []);

  return (
    <>
      <MarkAsPaidDialog
        invoices={selectedInvoices}
        isOpen={isMarkAsPaidOpen}
        onIsOpenChange={setIsMarkAsPaidOpen}
        onComplete={onClearSelection}
      />
      <MarkAsUnpaidDialog
        invoices={selectedInvoices}
        isOpen={isMarkAsUnpaidOpen}
        onIsOpenChange={setIsMarkAsUnpaidOpen}
        onComplete={onClearSelection}
      />
      <CreateInvoiceDialog
        isOpen={isCreateInvoiceOpen}
        onIsOpenChange={setIsCreateInvoiceOpen}
        onComplete={onClearSelection}
      />
      <div>
        <InvoicesTableActions
          currentPage={currentPage}
          onChangePage={onChangePage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          selectedInvoices={selectedInvoices}
          textSearch={textSearch}
          setTextSearch={setTextSearch}
          onOpenMarkAsPaid={() => setIsMarkAsPaidOpen(true)}
          onOpenCreateInvoice={() => setIsCreateInvoiceOpen(true)}
          onOpenMarkAsUnpaid={() => setIsMarkAsUnpaidOpen(true)}
          onOpenDelete={() => undefined}
        />
      </div>
      <div className="mt-4 overflow-auto">
        <InvoicesTable
          invoices={paginatedData || []}
          onSelectAllInvoices={onToggleAllInvoices}
          onSelectInvoice={onToggleInvoice}
          selectedInvoices={selectedInvoices}
          textSearch={textSearch}
        />
      </div>
    </>
  );
}
