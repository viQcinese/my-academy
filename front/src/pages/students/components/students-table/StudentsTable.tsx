"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "../../../../model/Student";
import { Checkbox } from "@/components/ui/checkbox";
import { empty } from "@/constants/empty";
import { useMemo } from "react";
import { Archive, SquareMousePointer } from "lucide-react";
import { cx } from "class-variance-authority";

interface DataTableProps {
  textSearch: string;
  students: Student[];
  selectedStudents: number[];
  onSelectStudent: (value: boolean, id: number) => void;
  onSelectAllStudents: (value: boolean) => void;
}

export function DataTable(props: DataTableProps) {
  const {
    students,
    selectedStudents,
    textSearch,
    onSelectStudent,
    onSelectAllStudents,
  } = props;

  const filteredStudents = useMemo(() => {
    const query = textSearch.toLowerCase();
    return students.filter(
      (s) =>
        s.firstName.toLowerCase().includes(query) ||
        s.lastName?.toLowerCase().includes(query) ||
        selectedStudents.includes(s.id)
    );
  }, [students, selectedStudents, textSearch]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="pl-3 w-12 cursor-pointer"
              onClick={() =>
                onSelectAllStudents(
                  !(students.length === selectedStudents.length)
                )
              }
            >
              <Checkbox checked={students.length === selectedStudents.length} />
            </TableHead>
            {["First Name", "Last Name", "Cellphone", "Email", "Status"].map(
              (header) => (
                <TableHead key={header} className="font-bold">
                  {header}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.length ? (
            filteredStudents.map((student) => (
              <TableRow
                key={student.id}
                className={cx(
                  "h-10",
                  student.isActive ? "text-slate-900" : "text-slate-400"
                )}
                data-state={
                  selectedStudents.includes(student.id) ? "selected" : undefined
                }
              >
                <TableCell
                  className="pl-3 cursor-pointer"
                  onClick={() =>
                    onSelectStudent(
                      !selectedStudents.includes(student.id),
                      student.id
                    )
                  }
                >
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={(value: boolean) => {
                      onSelectStudent(value, student.id);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <button className="flex items-center font-bold gap-1 group hover:underline">
                    {student.firstName}
                    <SquareMousePointer
                      size={14}
                      strokeWidth={2}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </button>
                </TableCell>
                <TableCell>{student.lastName || empty}</TableCell>
                <TableCell>{student.cellphone || empty}</TableCell>
                <TableCell>{student.email || empty}</TableCell>
                <TableCell className={"flex items-center gap-1 leading-tight"}>
                  {!student.isActive && <Archive size={12} />}
                  {student.isActive ? "Active" : "Inactive"}
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
