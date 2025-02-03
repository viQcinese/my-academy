import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Student } from "@/model/Student";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { IconLeft } from "react-day-picker";
import { StudentForm } from "../../components/student-form/StudentForm";
import { StudentFormData } from "../../model/StudentFormData";
import { editStudent } from "@/api/editStudent";

type Props = {
  student: Student;
  goBack: () => void;
};

export function EditStudent(props: Props) {
  const { goBack } = props;
  const [student, setStudent] = useState<StudentFormData>({
    firstName: props.student.firstName || "",
    lastName: props.student.lastName || "",
    birthdate: props.student.birthdate || new Date(),
    cellphone: props.student.cellphone || "",
    email: props.student.email || "",
    document: props.student.document || "",
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => editStudent(props.student.id, student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({
        queryKey: ["student", props.student.id],
      });
      goBack();
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  const isInvalid = !student.firstName;

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Button variant="ghost" className="flex w-6 h-8" onClick={goBack}>
            <IconLeft />
          </Button>
          Edit Student
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
    </div>
  );
}
