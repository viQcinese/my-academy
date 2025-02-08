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
import { empty } from "@/constants/empty";
import { useMemo } from "react";
import { Archive, SquareMousePointer } from "lucide-react";
import { cx } from "class-variance-authority";
import { Invoice } from "@/model/Invoice";

interface InvoicesTableProps {
  textSearch: string;
  invoices: Invoice[];
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

  // const filteredInvoices = useMemo(() => {
  //   const query = textSearch.toLowerCase();
  //   return invoices.filter(
  //     (s) =>
  //       s.firstName.toLowerCase().includes(query) ||
  //       s.lastName?.toLowerCase().includes(query) ||
  //       selectedInvoices.includes(s.id)
  //   );
  // }, [invoices, selectedInvoices, textSearch]);

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
            {["Due At", "Student", "Amount", "Created At"].map((header) => (
              <TableHead key={header} className="font-bold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length ? (
            invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                className={cx(
                  "h-10"
                  // invoice.dueAt() > Date.now() ? "text-slate-900" : "text-slate-400"
                )}
                data-state={
                  selectedInvoices.includes(invoice.id) ? "selected" : undefined
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
                <TableCell>
                  {invoice.dueAt}
                  {/* <button
                    className="flex items-center font-bold gap-1 group hover:underline"
                    onClick={() => onOpenInvoiceDetails(invoice.id)}
                  >
                    {invoice.firstName}
                    <SquareMousePointer
                      size={14}
                      strokeWidth={2}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </button> */}
                </TableCell>
                <TableCell>{invoice.studentId || empty}</TableCell>
                <TableCell>{invoice.amount || empty}</TableCell>
                <TableCell>{invoice.createdAt || empty}</TableCell>
                {/* <TableCell className={"flex items-center gap-1 leading-tight"}>
                  {!invoice.isActive && <Archive size={12} />}
                  {invoice.isActive ? "Active" : "Inactive"}
                </TableCell> */}
              </TableRow>
            ))
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
