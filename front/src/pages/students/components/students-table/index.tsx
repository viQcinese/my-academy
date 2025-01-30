"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Student } from "../../model/Student";
import { Checkbox } from "@/components/ui/checkbox";
import { empty } from "@/constants/empty";

interface DataTableProps {
  students: Student[];
  selectedStudents: number[];
  onSelectStudent: (value: boolean, id: number) => void;
  onSelectAllStudents: (value: boolean) => void;
}

export function DataTable(props: DataTableProps) {
  const { students, selectedStudents, onSelectStudent, onSelectAllStudents } =
    props;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={students.length === selectedStudents.length}
                onCheckedChange={onSelectAllStudents}
              />
            </TableHead>
            {["Name", "Cellphone", "Email", "Status"].map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.length ? (
            students.map((student) => (
              <TableRow
                key={student.id}
                data-state={
                  selectedStudents.includes(student.id) ? "selected" : undefined
                }
              >
                <TableCell>
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={(value: boolean) => {
                      onSelectStudent(value, student.id);
                    }}
                  />
                </TableCell>
                <TableCell>
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell>{student.cellphone || empty}</TableCell>
                <TableCell>{student.email || empty}</TableCell>
                <TableCell>
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
