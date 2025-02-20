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
import { PaymentTemplate } from "@/model/PaymentTemplate";

interface Props {
  textSearch: string;
  templates: PaymentTemplate[];
  selectedTemplates: number[];
  onSelectTemplate: (value: boolean, id: number) => void;
  onSelectAllTemplates: (value: boolean) => void;
}

export function TemplatesTable(props: Props) {
  const {
    templates,
    selectedTemplates,
    textSearch,
    onSelectTemplate,
    onSelectAllTemplates,
  } = props;

  const filteredtemplates = useMemo(() => {
    const query = textSearch.toLowerCase();
    return templates.filter(
      ({ name, id }) =>
        name.toLowerCase().includes(query) || selectedTemplates.includes(id)
    );
  }, [templates, selectedTemplates, textSearch]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="pl-3 w-12 cursor-pointer"
              onClick={() =>
                onSelectAllTemplates(
                  !(templates.length === selectedTemplates.length)
                )
              }
            >
              <Checkbox
                checked={templates.length === selectedTemplates.length}
              />
            </TableHead>
            {["Name", "Amount", "Frequency"].map((header) => (
              <TableHead key={header} className="font-bold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredtemplates.length ? (
            templates.map(({ id, name, currency, frequency, amount }) => {
              return (
                <TableRow
                  key={id}
                  className={cx("h-10")}
                  data-state={
                    selectedTemplates.includes(id) ? "selected" : undefined
                  }
                >
                  <TableCell
                    className="pl-3 cursor-pointer"
                    onClick={() =>
                      onSelectTemplate(!selectedTemplates.includes(id), id)
                    }
                  >
                    <Checkbox checked={selectedTemplates.includes(id)} />
                  </TableCell>
                  <TableCell className="font-bold">{name}</TableCell>
                  <TableCell>
                    {Intl.NumberFormat("pt", {
                      style: "currency",
                      currency: currency,
                    }).format(amount)}
                  </TableCell>
                  <TableCell className="capitalize">{frequency}</TableCell>
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
