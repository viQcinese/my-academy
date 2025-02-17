import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "@/api/student/createStudent";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { StudentFormData } from "../../model/StudentFormData";
import { StudentForm } from "../../components/student-form/StudentForm";

type Props = {
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
  onComplete: () => void;
};

const defaultStudent: StudentFormData = {
  firstName: "",
  lastName: "",
  birthdate: "",
  cellphone: "",
  email: "",
  document: "",
};

export function CreateStudentDialog(props: Props) {
  const { isOpen, onIsOpenChange, onComplete } = props;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      onIsOpenChange(false);
      setStudent(defaultStudent);
      onComplete();
    },
  });

  const [student, setStudent] = useState<StudentFormData>(defaultStudent);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({
      ...student,
      birthdate: student.birthdate
        ? new Date(student.birthdate).toISOString()
        : undefined,
    });
  }

  const isInvalid = !student.firstName;

  return (
    <Dialog open={isOpen} onOpenChange={onIsOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create Student
          </DialogTitle>
          <DialogDescription>
            Input student data and click to submit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <StudentForm student={student} setStudent={setStudent} />
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
    </Dialog>
  );
}
