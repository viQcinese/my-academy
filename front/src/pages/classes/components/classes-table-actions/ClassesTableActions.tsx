import { Pagination } from "@/components/pagination/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type Props = {
  selectedClasses: number[];
  textSearch: string;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onChangePage: (page: number) => void;
  setTextSearch: (value: string) => void;
  onOpenCreateClass: () => void;
  onOpenActivateClass: () => void;
  onOpenDeactivateClass: () => void;
};

export function ClassesTableActions(props: Props) {
  const {
    currentPage,
    totalItems,
    selectedClasses,
    textSearch,
    itemsPerPage,
    onChangePage,
    setTextSearch,
    onOpenCreateClass,
    onOpenActivateClass,
    onOpenDeactivateClass,
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
        <Button variant="outline" onClick={onOpenCreateClass}>
          <Plus />
          Create Class
        </Button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            disabled={selectedClasses.length === 0}
            onClick={onOpenActivateClass}
            size="sm"
            variant="outline"
          >
            Activate
          </Button>
          <Button
            disabled={selectedClasses.length === 0}
            onClick={onOpenDeactivateClass}
            size="sm"
            variant="outline"
          >
            Deactivate
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
