"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useMemo } from "react";
import { cx } from "class-variance-authority";
import { InvoiceTableItem } from "@/model/Invoice";

interface InvoicesTableProps {
  textSearch: string;
  invoices: InvoiceTableItem[];
  selectedInvoices: number[];
  onOpenInvoiceDetails: (InvoiceId: number) => void;
  onSelectInvoice: (value: boolean, id: number) => void;
  onSelectAllInvoices: (value: boolean) => void;
}

export function InvoicesTable(props: InvoicesTableProps) {
  const {
    invoices,
    selectedInvoices,
    textSearch,
    onOpenInvoiceDetails,
    onSelectInvoice,
    onSelectAllInvoices,
  } = props;

  const filteredInvoices = useMemo(() => {
    const query = textSearch.toLowerCase();
    return invoices.filter(
      ({ invoice, student }) =>
        student?.firstName.toLowerCase().includes(query) ||
        student?.lastName?.toLowerCase().includes(query) ||
        selectedInvoices.includes(invoice.id)
    );
  }, [invoices, selectedInvoices, textSearch]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="pl-3 w-12 cursor-pointer"
              onClick={() =>
                onSelectAllInvoices(
                  !(invoices.length === selectedInvoices.length)
                )
              }
            >
              <Checkbox checked={invoices.length === selectedInvoices.length} />
            </TableHead>
            {["Due At", "Student", "Amount", "Created At", "Status"].map(
              (header) => (
                <TableHead key={header} className="font-bold">
                  {header}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.length ? (
            invoices.map(({ invoice, student }) => {
              const status = invoice.isPaid
                ? "Paid"
                : new Date(invoice.dueAt).getTime() < Date.now()
                ? "Overdue"
                : "Pending";
              return (
                <TableRow
                  key={invoice.id}
                  className={cx(
                    "h-10",
                    status === "Paid" && "bg-green-50 hover:bg-green-50",
                    status === "Pending" && "bg-yellow-50 hover:bg-yellow-50"
                  )}
                  data-state={
                    selectedInvoices.includes(invoice.id)
                      ? "selected"
                      : undefined
                  }
                >
                  <TableCell
                    className="pl-3 cursor-pointer"
                    onClick={() =>
                      onSelectInvoice(
                        !selectedInvoices.includes(invoice.id),
                        invoice.id
                      )
                    }
                  >
                    <Checkbox checked={selectedInvoices.includes(invoice.id)} />
                  </TableCell>
                  <TableCell>{invoice.dueAt}</TableCell>
                  <TableCell>
                    {`${student?.firstName} ${student?.lastName}`}
                  </TableCell>
                  <TableCell>
                    {Intl.NumberFormat("pt", {
                      style: "currency",
                      currency: invoice.currency,
                    }).format(invoice.amount)}
                  </TableCell>
                  <TableCell>
                    {Intl.DateTimeFormat("pt-br", {}).format(
                      new Date(invoice.createdAt)
                    )}
                  </TableCell>
                  <TableCell>{status}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
