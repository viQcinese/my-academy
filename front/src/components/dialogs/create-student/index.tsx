import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Student } from "@/pages/students/model/Student";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "@/api/createStudent";
import { Loader2 } from "lucide-react";
import { ClassesMultiSelect } from "./ClassesMultiSelect";

type Props = {
  student?: Partial<Student>;
};

export function CreateStudentDialog(props: Props) {
  const [student, setStudent] = useState<Partial<Student>>({
    firstName: props.student?.firstName || "",
    lastName: props.student?.lastName || "",
    birthdate: props.student?.birthdate || new Date(),
    cellphone: props.student?.cellphone || "",
    email: props.student?.email || "",
    document: props.student?.document || "",
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      setStudent({
        firstName: "",
        lastName: "",
        birthdate: new Date(),
        cellphone: "",
        document: "",
        email: "",
      });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(student);
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Student</DialogTitle>
        <DialogDescription>
          Input your student data here and click Save.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first-name" className="text-right">
              Classes
            </Label>
            <div className="col-span-3">
              <ClassesMultiSelect />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first-name" className="text-right">
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
        </div>
        <DialogFooter>
          <Button disabled={isPending} type="submit">
            {isPending && <Loader2 className="animate-spin" />}Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
