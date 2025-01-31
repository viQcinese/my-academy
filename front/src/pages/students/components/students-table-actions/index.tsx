import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";

type Props = {
  selectedStudents: number[];
};

export function StudentsTableActions(props: Props) {
  const { selectedStudents } = props;

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-between">
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
      <div className="flex gap-2">
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
    </div>
  );
}
