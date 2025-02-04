import { Layout } from "@/components/layout/Layout";
import { useSelectMany } from "@/hooks/useSelectMany";
import { useQuery } from "@tanstack/react-query";
import { Dialog } from "@/components/ui/dialog";
import { Class } from "@/model/Class";
import { ClassesTableActions } from "./components/classes-table-actions/ClassesTableActions";
import { useState } from "react";
import { ClassesTable } from "./components/classes-table/ClassesTable";
import { useStaticPagination } from "@/hooks/useStaticPagination";
import { ActivateClassesDialog } from "./dialogs/activate-classes/ActivateClasses";
import { DeactivateClassesDialog } from "./dialogs/deactivate-classes/DeactivateClassesDialog";

const ITEMS_PER_PAGE = 50;

export function ClassesPage() {
  const { data } = useQuery<Class[]>({ queryKey: ["classes"] });
  const studentIds = data?.map((student) => student.id) || [];
  const [selectedClasses, onToggleClass, onToggleAllClasses] =
    useSelectMany(studentIds);
  const [textSearch, setTextSearch] = useState("");
  const [isCreateClassOpen, setIsCreateClassOpen] = useState(false);
  const [isActivateClasssOpen, setIsActivateClasssOpen] = useState(false);
  const [isDeactivateClasssOpen, setIsDeactivateClasssOpen] = useState(false);
  const [openClassId, setOpenClassId] = useState<number>(0);
  const [isClassDetailsOpen, setIsClassDetailsOpen] = useState(false);

  function onOpenClass(studentId: number) {
    setOpenClassId(studentId);
    setIsClassDetailsOpen(true);
  }

  const { currentPage, onChangePage, paginatedData, totalItems } =
    useStaticPagination({
      data: data ?? [],
      onChangePage: () => onToggleAllClasses(false),
      itemsPerPage: ITEMS_PER_PAGE,
    });

  return (
    <Dialog>
      <ActivateClassesDialog
        classes={selectedClasses}
        isOpen={isActivateClasssOpen}
        onIsOpenChange={setIsActivateClasssOpen}
      />
      <DeactivateClassesDialog
        classes={selectedClasses}
        isOpen={isDeactivateClasssOpen}
        onIsOpenChange={setIsDeactivateClasssOpen}
      />
      <Layout>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Classes</h1>
          <p className="text">You can manage your classes here</p>
        </div>
        <div className="mt-16">
          <ClassesTableActions
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            onChangePage={onChangePage}
            onOpenActivateClass={() => setIsActivateClasssOpen(true)}
            onOpenDeactivateClass={() => setIsDeactivateClasssOpen(true)}
            onOpenCreateClass={() => setIsCreateClassOpen(true)}
            totalItems={totalItems}
            selectedClasses={selectedClasses}
            setTextSearch={setTextSearch}
            textSearch={textSearch}
          />
        </div>
        <div className="mt-4">
          <ClassesTable
            classes={paginatedData || []}
            onOpenClassDetails={onOpenClass}
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
