import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type Props = {
  selectedStudents: number[];
  textSearch: string;
  setTextSearch: (value: string) => void;
  onOpenCreateStudent: () => void;
  onOpenActivateStudents: () => void;
};

export function StudentsTableActions(props: Props) {
  const {
    selectedStudents,
    textSearch,
    setTextSearch,
    onOpenCreateStudent,
    onOpenActivateStudents,
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
          disabled={selectedStudents.length === 0 || true}
          size="sm"
          variant="outline"
        >
          Inactivate
        </Button>
      </div>
    </div>
  );
}
