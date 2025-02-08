import { Layout } from "@/components/layout/Layout";
import { useSelectMany } from "@/hooks/useSelectMany";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useStaticPagination } from "@/hooks/useStaticPagination";
import { InvoiceTableItem } from "@/model/Invoice";
import { getInvoices } from "@/api/invoices/getInvoices";
import { InvoicesTableActions } from "./components/invoices-table-actions/InvoicesTableActions";
import { InvoicesTable } from "./components/invoices-table/InvoicesTable";
import { Student } from "@/model/Student";
import { getStudents } from "@/api/student/getStudents";

const ITEMS_PER_PAGE = 50;

export function InvoicesPage() {
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
  const [isActivateInvoicesOpen, setIsActivateInvoicesOpen] = useState(false);
  const [isDeactivateInvoicesOpen, setIsDeactivateInvoicesOpen] =
    useState(false);
  const [openInvoiceId, setOpenInvoiceId] = useState<number>(0);
  const [isInvoiceDetailsOpen, setIsInvoiceDetailsOpen] = useState(false);
  const [isDeleteInvoicesOpen, setIsDeleteInvoicesOpen] = useState(false);

  function onOpenInvoice(invoiceId: number) {
    setOpenInvoiceId(invoiceId);
    setIsInvoiceDetailsOpen(true);
  }

  const { currentPage, onChangePage, paginatedData, totalItems } =
    useStaticPagination({
      data: data ?? [],
      onChangePage: () => onToggleAllInvoices(false),
      itemsPerPage: ITEMS_PER_PAGE,
    });

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Invoices</h1>
        <p className="text">You can manage your invoices here</p>
      </div>
      <div className="mt-16">
        <InvoicesTableActions
          currentPage={currentPage}
          onChangePage={onChangePage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          selectedInvoices={selectedInvoices}
          textSearch={textSearch}
          setTextSearch={setTextSearch}
          onOpenMarkAsPaid={() => setIsActivateInvoicesOpen(true)}
          onOpenCreateInvoice={() => setIsCreateInvoiceOpen(true)}
          onOpenMarkAsUnpaid={() => setIsDeactivateInvoicesOpen(true)}
          onOpenDelete={() => setIsDeleteInvoicesOpen(true)}
        />
      </div>
      <div className="mt-4 overflow-auto">
        <InvoicesTable
          invoices={paginatedData || []}
          onOpenInvoiceDetails={onOpenInvoice}
          onSelectAllInvoices={onToggleAllInvoices}
          onSelectInvoice={onToggleInvoice}
          selectedInvoices={selectedInvoices}
          textSearch={textSearch}
        />
      </div>
    </Layout>
  );
}
