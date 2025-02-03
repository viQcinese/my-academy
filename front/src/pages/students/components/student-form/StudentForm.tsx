import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StudentFormData } from "../../model/StudentFormData";

type Props = {
  setStudent: (student: StudentFormData) => void;
  student: StudentFormData;
};

export function StudentForm(props: Props) {
  const { student, setStudent } = props;

  return (
    <div>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label isRequired htmlFor="first-name" className="text-right">
            First Name
          </Label>
          <Input
            id="first-name"
            onChange={(e) =>
              setStudent({ ...student, firstName: e.currentTarget.value })
            }
            value={student.firstName}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="last-name" className="text-right">
            Last Name
          </Label>
          <Input
            id="last-name"
            onChange={(e) =>
              setStudent({ ...student, lastName: e.currentTarget.value })
            }
            value={student.lastName}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="birthdate" className="text-right">
            Birthdate
          </Label>
          <Input
            id="birthdate"
            type="date"
            onChange={() => setStudent({ ...student, birthdate: new Date() })}
            value={student.birthdate?.toString()}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="document" className="text-right">
            Document
          </Label>
          <Input
            id="document"
            onChange={(e) =>
              setStudent({ ...student, document: e.currentTarget.value })
            }
            value={student.document}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cellphone" className="text-right">
            Cellphone
          </Label>
          <Input
            id="cellphone"
            onChange={(e) =>
              setStudent({ ...student, cellphone: e.currentTarget.value })
            }
            value={student.cellphone}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            onChange={(e) =>
              setStudent({ ...student, email: e.currentTarget.value })
            }
            value={student.email}
            className="col-span-3"
          />
        </div>
      </div>
    </div>
  );
}
