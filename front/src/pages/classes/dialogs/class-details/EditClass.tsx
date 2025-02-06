import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import { editClass } from "@/api/class/editClass";
import { updateClassEnrollments } from "@/api/class/updateClassEnrollments";
import { ClassForm } from "../../components/class-form/ClassForm";
import { ClassDetails } from "@/model/ClassDetails";
import { Student } from "@/model/Student";

type Props = {
  classDetails: ClassDetails;
  goBack: () => void;
};

export function EditClass(props: Props) {
  const { goBack, classDetails } = props;
  const [name, setName] = useState<string>(classDetails.class.name);
  const [selectedStudents, setSelectedStudents] = useState<string[]>(
    classDetails.students.map((student) => student.id.toString())
  );

  const { data } = useQuery<Student[]>({ queryKey: ["students"] });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await editClass(classDetails.class.id, { name });
      await updateClassEnrollments(
        classDetails.class.id,
        selectedStudents.map((id) => Number(id))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      queryClient.invalidateQueries({
        queryKey: ["class", classDetails.class.id],
      });
      goBack();
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  const activeStudents = data?.filter((student) => student.isActive) || [];
  const isInvalid = !name;

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Button variant="ghost" className="flex w-8 h-8" onClick={goBack}>
            <ChevronLeft />
          </Button>
          Edit Class
        </DialogTitle>
        <DialogDescription>
          Input class data and click to submit.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <ClassForm
          name={name}
          setName={setName}
          selectedStudents={selectedStudents}
          setSelectedStudents={setSelectedStudents}
          students={activeStudents}
        />
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
