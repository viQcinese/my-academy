import { Layout } from "@/components/layout";
import { DataTable } from "./components/students-table";
import { useSelectMany } from "@/hooks/useSelectMany";
import { useQuery } from "@tanstack/react-query";
import { Dialog } from "@/components/ui/dialog";
import { CreateStudentDialog } from "@/components/dialogs/create-student";
import { Student } from "../../model/Student";
import { StudentsTableActions } from "./components/students-table-actions";
import { useState } from "react";

export function StudentsPage() {
  const { data } = useQuery<Student[]>({ queryKey: ["students"] });
  const studentIds = data?.map((student) => student.id) || [];
  const [selectedStudents, onToggleStudent, onToggleAllStudents] =
    useSelectMany(studentIds);
  const [textSearch, setTextSearch] = useState("");

  return (
    <Dialog>
      <CreateStudentDialog />
      <Layout>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Students</h1>
          <p className="text">You can manage your students here</p>
        </div>
        <div className="mt-16">
          <StudentsTableActions
            selectedStudents={selectedStudents}
            textSearch={textSearch}
            setTextSearch={setTextSearch}
          />
        </div>
        <div className="mt-4">
          <DataTable
            students={data || []}
            selectedStudents={selectedStudents}
            onSelectStudent={onToggleStudent}
            onSelectAllStudents={onToggleAllStudents}
            textSearch={textSearch}
          />
        </div>
      </Layout>
    </Dialog>
  );
}
