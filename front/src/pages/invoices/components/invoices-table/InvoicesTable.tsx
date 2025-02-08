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
import { empty } from "@/constants/empty";
import { AlertCircle, CheckIcon } from "lucide-react";

interface InvoicesTableProps {
  textSearch: string;
  invoices: InvoiceTableItem[];
  selectedInvoices: string[];
  onSelectInvoice: (value: boolean, id: string) => void;
  onSelectAllInvoices: (value: boolean) => void;
}

export function InvoicesTable(props: InvoicesTableProps) {
  const {
    invoices,
    selectedInvoices,
    textSearch,
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
            {["Student", "Amount", "Due at", "Created at", "Status"].map(
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
                ? "paid"
                : new Date(invoice.dueAt).getTime() < Date.now()
                ? "overdue"
                : "pending";
              const statusIcon =
                status === "paid" ? (
                  <CheckIcon size={12} />
                ) : status === "overdue" ? (
                  <AlertCircle size={12} />
                ) : null;

              return (
                <TableRow
                  key={invoice.id}
                  className={cx(
                    "h-10",
                    status === "paid" &&
                      "bg-green-50 hover:bg-green-50 data-[state='selected']:bg-green-50",
                    status === "overdue" &&
                      "bg-red-50 hover:bg-red-50 data-[state='selected']:bg-red-50"
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
                  <TableCell className="font-bold">
                    {`${student?.firstName} ${student?.lastName}`}
                  </TableCell>
                  <TableCell>
                    {Intl.NumberFormat("pt", {
                      style: "currency",
                      currency: invoice.currency,
                    }).format(invoice.amount)}
                  </TableCell>
                  <TableCell>
                    {invoice.dueAt
                      ? Intl.DateTimeFormat("pt-br", {}).format(
                          new Date(invoice.dueAt)
                        )
                      : empty}
                  </TableCell>
                  <TableCell>
                    {Intl.DateTimeFormat("pt-br", {}).format(
                      new Date(invoice.createdAt)
                    )}
                  </TableCell>
                  <TableCell
                    className={
                      "flex items-center gap-1 leading-tight capitalize"
                    }
                  >
                    {status}
                    {statusIcon}
                  </TableCell>
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
