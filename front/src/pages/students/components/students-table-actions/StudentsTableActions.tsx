import { Pagination } from "@/components/pagination/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type Props = {
  selectedStudents: number[];
  textSearch: string;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onChangePage: (page: number) => void;
  setTextSearch: (value: string) => void;
  onOpenCreateStudent: () => void;
  onOpenActivateStudents: () => void;
  onOpenDeactivateStudents: () => void;
};

export function StudentsTableActions(props: Props) {
  const {
    currentPage,
    totalItems,
    selectedStudents,
    textSearch,
    itemsPerPage,
    onChangePage,
    setTextSearch,
    onOpenCreateStudent,
    onOpenActivateStudents,
    onOpenDeactivateStudents,
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
        <Button variant="outline" onClick={onOpenCreateStudent}>
          <Plus />
          Create student
        </Button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            disabled={selectedStudents.length === 0 || true}
            size="sm"
            variant="outline"
          >
            Create Invoice
          </Button>
          <Button
            disabled={selectedStudents.length === 0}
            onClick={onOpenActivateStudents}
            size="sm"
            variant="outline"
          >
            Activate
          </Button>
          <Button
            disabled={selectedStudents.length === 0}
            onClick={onOpenDeactivateStudents}
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
