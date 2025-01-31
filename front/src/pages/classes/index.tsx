import { Layout } from "@/components/layout";
import { useSelectMany } from "@/hooks/useSelectMany";
import { useQuery } from "@tanstack/react-query";
import { Dialog } from "@/components/ui/dialog";
import { Class } from "@/model/Class";
import { ClassesTableActions } from "./classes-table-actions";
import { useState } from "react";
import { ClassesTable } from "./classes-table";

export function ClassesPage() {
  const { data } = useQuery<Class[]>({ queryKey: ["classes"] });
  const classesIds = data?.map((student) => student.id) || [];
  const [selectedClasses, onToggleClass, onToggleAllClasses] =
    useSelectMany(classesIds);
  const [textSearch, setTextSearch] = useState("");

  return (
    <Dialog>
      {/* <CreateStudentDialog /> */}
      <Layout>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Classes</h1>
          <p className="text">You can manage your classes here</p>
        </div>
        <div className="mt-16">
          <ClassesTableActions
            selectedClasses={selectedClasses}
            setTextSearch={setTextSearch}
            textSearch={textSearch}
          />
        </div>
        <div className="mt-4">
          <ClassesTable
            classes={data || []}
            onSelectAllClasses={onToggleAllClasses}
            onSelectClass={onToggleClass}
            selectedClasses={selectedClasses}
            textSearch={textSearch}
          />
        </div>
      </Layout>
    </Dialog>
  );
}
