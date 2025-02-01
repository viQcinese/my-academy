import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";

type Props = {
  selectedStudents: number[];
  textSearch: string;
  setTextSearch: (value: string) => void;
};

export function StudentsTableActions(props: Props) {
  const { selectedStudents, textSearch, setTextSearch } = props;

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
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
            Create student
          </Button>
        </DialogTrigger>
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
          disabled={selectedStudents.length === 0 || true}
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
