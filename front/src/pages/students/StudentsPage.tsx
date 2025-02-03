import { Layout } from "@/components/layout/Layout";
import { DataTable } from "./components/students-table/StudentsTable";
import { useSelectMany } from "@/hooks/useSelectMany";
import { useQuery } from "@tanstack/react-query";
import { CreateStudentDialog } from "@/pages/students/dialogs/create-student/CreateStudentDialog";
import { Student } from "../../model/Student";
import { StudentsTableActions } from "./components/students-table-actions/StudentsTableActions";
import { useState } from "react";
import { ActivateStudentsDialog } from "./dialogs/activate-students/ActivateStudents";

export function StudentsPage() {
  const { data } = useQuery<Student[]>({ queryKey: ["students"] });
  const studentIds = data?.map((student) => student.id) || [];
  const [selectedStudents, onToggleStudent, onToggleAllStudents] =
    useSelectMany(studentIds);
  const [textSearch, setTextSearch] = useState("");
  const [isCreateStudentOpen, setIsCreateStudentOpen] = useState(false);
  const [isActivateStudentsOpen, setIsActivateStudentsOpen] = useState(false);

  return (
    <Layout>
      <ActivateStudentsDialog
        students={selectedStudents}
        isOpen={isActivateStudentsOpen}
        onIsOpenChange={setIsActivateStudentsOpen}
      />
      <CreateStudentDialog
        isOpen={isCreateStudentOpen}
        onIsOpenChange={setIsCreateStudentOpen}
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Students</h1>
        <p className="text">You can manage your students here</p>
      </div>
      <div className="mt-16">
        <StudentsTableActions
          selectedStudents={selectedStudents}
          textSearch={textSearch}
          setTextSearch={setTextSearch}
          onOpenActivateStudents={() => setIsActivateStudentsOpen(true)}
          onOpenCreateStudent={() => setIsCreateStudentOpen(true)}
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
  );
}
