import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Student } from "@/model/Student";

type Props = {
  name: string;
  setName: (value: string) => void;
  students: Student[];
  selectedStudents: string[];
  setSelectedStudents: (value: string[]) => void;
};

export function ClassForm(props: Props) {
  const { name, setName, selectedStudents, setSelectedStudents, students } =
    props;

  return (
    <div>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label isRequired htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Students
          </Label>
          <div className="col-span-3">
            <MultiSelect
              withSearchInput
              options={students.map((student) => ({
                value: student.id.toString(),
                label: `${student.firstName} ${student.lastName ?? ""}`,
              }))}
              defaultValue={selectedStudents}
              onValueChange={setSelectedStudents}
              value={selectedStudents}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
