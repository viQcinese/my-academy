import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Student } from "@/model/Student";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { IconLeft } from "react-day-picker";

type Props = {
  student?: Partial<Student>;
  goBack?: () => void;
  mutation: ReturnType<typeof useMutation<Student, Error, Partial<Student>>>;
};

export function StudentForm(props: Props) {
  const { goBack } = props;
  const [student, setStudent] = useState<Partial<Student>>({
    firstName: props.student?.firstName || "",
    lastName: props.student?.lastName || "",
    birthdate: props.student?.birthdate || new Date(),
    cellphone: props.student?.cellphone || "",
    email: props.student?.email || "",
    document: props.student?.document || "",
  });

  const { mutate, isPending } = props.mutation;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(student);
  }

  const isEdit = !!props.student;
  const isInvalid = !student.firstName;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          {goBack && (
            <Button variant="ghost" className="flex w-6 h-8" onClick={goBack}>
              <IconLeft />
            </Button>
          )}
          {isEdit ? "Edit Student" : "Create Student"}
        </DialogTitle>
        <DialogDescription>
          Input student data and click to submit.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
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
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending || isInvalid} type="submit">
            {isPending && <Loader2 className="animate-spin" />}Submit
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
