import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { DataTable } from "./components/students-table/students-table";
import { Student } from "./model/student";
import { useSelectMany } from "@/hooks/useSelectMany";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "@/api/getStudents";

// const students: Student[] = Array.from({ length: 20 }, (_, i) => ({
//   id: i,
//   isActive: true,
//   firstName: "Vitor",
//   secondName: "Senise Furtado",
//   birthdate: new Date(),
//   cellphone: "+55 11 99754-0064",
//   email: "vitor.senise@gmail.com",
// }));

export function StudentsPage() {
  const { data } = useQuery({ queryKey: ["students"], queryFn: getStudents });
  const studentIds = data?.map((student) => student.id) || [];
  const [selectedStudents, onToggleStudent, onToggleAllStudents] =
    useSelectMany(studentIds);

  return (
    <Layout>
      <div className="mt-8 flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Students</h1>
        <p className="text">You can manage your students here</p>
      </div>
      <div className="mt-16 flex justify-between">
        <div className="flex gap-4">
          <Input placeholder="Search..." />
        </div>
        <Button variant="outline">
          <Plus />
          Create student
        </Button>
      </div>
      <div className="mt-4 flex gap-2">
        <Button
          disabled={selectedStudents.length === 0}
          size="sm"
          variant="outline"
        >
          Create Invoice
        </Button>
        <Button
          disabled={selectedStudents.length === 0}
          size="sm"
          variant="outline"
        >
          Create Invoice
        </Button>
        <Button
          disabled={selectedStudents.length === 0}
          size="sm"
          variant="outline"
        >
          Create Invoice
        </Button>
      </div>
      <div className="mt-4">
        <DataTable
          students={data || []}
          selectedStudents={selectedStudents}
          onSelectStudent={onToggleStudent}
          onSelectAllStudents={onToggleAllStudents}
        />
      </div>
    </Layout>
  );
}
