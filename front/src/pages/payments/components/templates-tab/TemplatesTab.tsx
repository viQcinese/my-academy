import { useSelectMany } from "@/hooks/useSelectMany";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useStaticPagination } from "@/hooks/useStaticPagination";
import { TemplatesTableActions } from "../templates-table-actions/TemplatesTableActions";
import { getTemplates } from "@/api/templates/getTemplates";
import { PaymentTemplate } from "@/model/PaymentTemplate";
import { TemplatesTable } from "../templates-table/TemplatesTable";
import { CreateTemplateDialog } from "../../dialogs/create-template/CreateTemplate";

const ITEMS_PER_PAGE = 50;

export function TemplatesTab() {
  const { data } = useQuery<PaymentTemplate[]>({
    queryFn: getTemplates,
    queryKey: ["templates"],
  });

  const templateIds = data?.map((template) => template.id) || [];
  const [selectedTemplates, onToggleTemplate, onToggleAllTemplates] =
    useSelectMany(templateIds);
  const [textSearch, setTextSearch] = useState("");
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);

  const { currentPage, onChangePage, paginatedData, totalItems } =
    useStaticPagination({
      data: data ?? [],
      onChangePage: () => onToggleAllTemplates(false),
      itemsPerPage: ITEMS_PER_PAGE,
    });

  function onClearSelection() {
    onToggleAllTemplates(false);
  }

  useEffect(() => {
    document.title = "Zygurat | Payments";
  }, []);

  return (
    <>
      <CreateTemplateDialog
        isOpen={isCreateTemplateOpen}
        onIsOpenChange={setIsCreateTemplateOpen}
        onComplete={onClearSelection}
      />
      <div>
        <TemplatesTableActions
          currentPage={currentPage}
          onChangePage={onChangePage}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          selectedTemplates={selectedTemplates}
          textSearch={textSearch}
          setTextSearch={setTextSearch}
          onOpenCreateTemplate={() => setIsCreateTemplateOpen(true)}
          onOpenDeleteTemplate={() => undefined}
        />
      </div>
      <div className="mt-4 overflow-auto">
        <TemplatesTable
          templates={paginatedData || []}
          onSelectAllTemplates={onToggleAllTemplates}
          onSelectTemplate={onToggleTemplate}
          selectedTemplates={selectedTemplates}
          textSearch={textSearch}
        />
      </div>
    </>
  );
}
