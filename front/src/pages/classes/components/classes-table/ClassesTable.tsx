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
import { Class } from "@/model/Class";

interface ClassesTableProps {
  textSearch: string;
  classes: Class[];
  selectedClasses: number[];
  onOpenClassDetails: (classId: number) => void;
  onSelectClass: (value: boolean, id: number) => void;
  onSelectAllClasses: (value: boolean) => void;
}

export function ClassesTable(props: ClassesTableProps) {
  const {
    classes,
    selectedClasses,
    textSearch,
    onOpenClassDetails,
    onSelectClass,
    onSelectAllClasses,
  } = props;

  const filteredClasses = useMemo(() => {
    const query = textSearch.toLowerCase();
    return classes.filter(
      (s) =>
        s.name.toLowerCase().includes(query) || selectedClasses.includes(s.id)
    );
  }, [classes, selectedClasses, textSearch]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="pl-3 w-12 cursor-pointer"
              onClick={() =>
                onSelectAllClasses(!(classes.length === selectedClasses.length))
              }
            >
              <Checkbox checked={classes.length === selectedClasses.length} />
            </TableHead>
            {["Name", "Students", "Status"].map((header) => (
              <TableHead key={header} className="font-bold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClasses.length ? (
            filteredClasses.map((c) => (
              <TableRow
                key={c.id}
                className={cx(
                  "h-10",
                  c.isActive ? "text-slate-900" : "text-slate-400"
                )}
                data-state={
                  selectedClasses.includes(c.id) ? "selected" : undefined
                }
              >
                <TableCell
                  className="pl-3 cursor-pointer"
                  onClick={() =>
                    onSelectClass(!selectedClasses.includes(c.id), c.id)
                  }
                >
                  <Checkbox checked={selectedClasses.includes(c.id)} />
                </TableCell>
                <TableCell>
                  <button
                    className="flex items-center font-bold gap-1 group hover:underline"
                    onClick={() => onOpenClassDetails(c.id)}
                  >
                    {c.name}
                    <SquareMousePointer
                      size={14}
                      strokeWidth={2}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                </TableCell>
                <TableCell>{c.studentsCount}</TableCell>
                <TableCell className={"flex items-center gap-1 leading-tight"}>
                  {!c.isActive && <Archive size={12} />}
                  {c.isActive ? "Active" : "Inactive"}
                </TableCell>
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
