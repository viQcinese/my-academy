import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { DataTable } from "./components/students-table";
import { useSelectMany } from "@/hooks/useSelectMany";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateStudentDialog } from "@/components/dialogs/create-student";
import { Class } from "./model/Class";

export function ClassesPage() {
  const { data } = useQuery<Class[]>({ queryKey: ["classes"] });
  const classesIds = data?.map((student) => student.id) || [];
  const [selectedClasses, onToggleClass, onToggleAllClasses] =
    useSelectMany(classesIds);

  return (
    <Dialog>
      <CreateStudentDialog />
      <Layout>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Classes</h1>
          <p className="text">You can manage your classes here</p>
        </div>
        {/* <div className="mt-16 flex justify-between">
          <div className="flex gap-4">
            <Input placeholder="Search..." />
          </div>
          <DialogTrigger>
            <Button variant="outline">
              <Plus />
              Create student
            </Button>
          </DialogTrigger>
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
        </div> */}
      </Layout>
    </Dialog>
  );
}
