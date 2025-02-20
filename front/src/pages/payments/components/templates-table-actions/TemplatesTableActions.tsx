import { Pagination } from "@/components/pagination/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type Props = {
  selectedTemplates: number[];
  textSearch: string;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onChangePage: (page: number) => void;
  setTextSearch: (value: string) => void;
  onOpenCreateTemplate: () => void;
  onOpenDeleteTemplate: () => void;
};

export function TemplatesTableActions(props: Props) {
  const {
    currentPage,
    totalItems,
    selectedTemplates,
    textSearch,
    itemsPerPage,
    onChangePage,
    setTextSearch,
    onOpenCreateTemplate,
    onOpenDeleteTemplate,
  } = props;

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Input
            placeholder="Search..."
            value={textSearch}
            onChange={(e) => setTextSearch(e.currentTarget.value)}
          />
        </div>
        <Button variant="outline" onClick={onOpenCreateTemplate}>
          <Plus />
          Create Template
        </Button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            disabled={selectedTemplates.length === 0}
            onClick={onOpenDeleteTemplate}
            size="sm"
            variant="outline"
          >
            Delete
          </Button>
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            onChangePage={onChangePage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
