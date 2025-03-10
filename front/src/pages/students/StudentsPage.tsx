import { Layout } from "@/components/layout/Layout";
import { StudentsTable } from "./components/students-table/StudentsTable";
import { useSelectMany } from "@/hooks/useSelectMany";
import { useQuery } from "@tanstack/react-query";
import { CreateStudentDialog } from "@/pages/students/dialogs/create-student/CreateStudentDialog";
import { Student } from "../../model/Student";
import { StudentsTableActions } from "./components/students-table-actions/StudentsTableActions";
import { useEffect, useState } from "react";
import { ActivateStudentsDialog } from "./dialogs/activate-students/ActivateStudents";
import { DeactivateStudentsDialog } from "./dialogs/deactivate-students/DeactivateStudents";
import { StudentDetailsDialog } from "./dialogs/student-details/StudentDetailsDialog";
import { useStaticPagination } from "@/hooks/useStaticPagination";
import { getStudents } from "@/api/student/getStudents";

const ITEMS_PER_PAGE = 50;

export function StudentsPage() {
  const { data } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: getStudents,
  });
  const studentIds = data?.map((student) => student.id) || [];
  const [selectedStudents, onToggleStudent, onToggleAllStudents] =
    useSelectMany(studentIds);
  const [textSearch, setTextSearch] = useState("");
  const [isCreateStudentOpen, setIsCreateStudentOpen] = useState(false);
  const [isActivateStudentsOpen, setIsActivateStudentsOpen] = useState(false);
  const [isDeactivateStudentsOpen, setIsDeactivateStudentsOpen] =
    useState(false);
  const [openStudentId, setOpenStudentId] = useState<number>(0);
  const [isStudentDetailsOpen, setIsStudentDetailsOpen] = useState(false);

  function onOpenStudent(studentId: number) {
    setOpenStudentId(studentId);
    setIsStudentDetailsOpen(true);
  }

  const { currentPage, onChangePage, paginatedData, totalItems } =
    useStaticPagination({
      data: data ?? [],
      onChangePage: () => onToggleAllStudents(false),
      itemsPerPage: ITEMS_PER_PAGE,
    });

  function onClearSelection() {
    onToggleAllStudents(false);
  }

  useEffect(() => {
    document.title = "Zygurat | Students";
  }, []);

  return (
    <Layout>
      <CreateStudentDialog
        isOpen={isCreateStudentOpen}
        onIsOpenChange={setIsCreateStudentOpen}
        onComplete={onClearSelection}
      />
      <StudentDetailsDialog
        studentId={openStudentId}
        isOpen={isStudentDetailsOpen}
        onIsOpenChange={setIsStudentDetailsOpen}
      />
      <DeactivateStudentsDialog
        students={selectedStudents}
        isOpen={isDeactivateStudentsOpen}
        onIsOpenChange={setIsDeactivateStudentsOpen}
        onComplete={onClearSelection}
      />
      <ActivateStudentsDialog
        students={selectedStudents}
        isOpen={isActivateStudentsOpen}
        onIsOpenChange={setIsActivateStudentsOpen}
        onComplete={onClearSelection}
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Students</h1>
        <p className="text">You can manage your students here</p>
      </div>
      <div className="mt-16">
        <StudentsTableActions
          currentPage={currentPage}
          onChangePage={onChangePage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          selectedStudents={selectedStudents}
          textSearch={textSearch}
          setTextSearch={setTextSearch}
          onOpenActivateStudents={() => setIsActivateStudentsOpen(true)}
          onOpenCreateStudent={() => setIsCreateStudentOpen(true)}
          onOpenDeactivateStudents={() => setIsDeactivateStudentsOpen(true)}
        />
      </div>
      <div className="mt-4 overflow-auto">
        <StudentsTable
          students={paginatedData || []}
          selectedStudents={selectedStudents}
          onSelectStudent={onToggleStudent}
          onSelectAllStudents={onToggleAllStudents}
          onOpenStudentDetails={onOpenStudent}
          textSearch={textSearch}
        />
      </div>
    </Layout>
  );
}
