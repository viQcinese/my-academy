"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Class } from "@/model/Class";
import { Checkbox } from "@/components/ui/checkbox";
import { useMemo } from "react";
import { Archive } from "lucide-react";
import { cx } from "class-variance-authority";

interface DataTableProps {
  textSearch: string;
  classes: Class[];
  selectedClasses: number[];
  onSelectClass: (value: boolean, id: number) => void;
  onSelectAllClasses: (value: boolean) => void;
}

export function ClassesTable(props: DataTableProps) {
  const {
    classes,
    onSelectAllClasses,
    onSelectClass,
    selectedClasses,
    textSearch,
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
            <TableHead className="pl-3">
              <Checkbox
                checked={classes.length === selectedClasses.length}
                onCheckedChange={onSelectAllClasses}
              />
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
            filteredClasses.map((studentClass) => (
              <TableRow
                key={studentClass.id}
                onClick={() =>
                  onSelectClass(
                    !selectedClasses.includes(studentClass.id),
                    studentClass.id
                  )
                }
                className={cx(
                  "cursor-pointer h-10",
                  studentClass.isActive ? "text-slate-900" : "text-slate-400"
                )}
                data-state={
                  selectedClasses.includes(studentClass.id)
                    ? "selected"
                    : undefined
                }
              >
                <TableCell className="pl-3">
                  <Checkbox
                    checked={selectedClasses.includes(studentClass.id)}
                    onCheckedChange={(value: boolean) => {
                      onSelectClass(value, studentClass.id);
                    }}
                  />
                </TableCell>
                <TableCell>{studentClass.name}</TableCell>
                <TableCell>{studentClass.studentsCount}</TableCell>
                <TableCell className={"flex items-center gap-1 leading-tight"}>
                  {!studentClass.isActive && <Archive size={12} />}
                  {studentClass.isActive ? "Active" : "Inactive"}
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
