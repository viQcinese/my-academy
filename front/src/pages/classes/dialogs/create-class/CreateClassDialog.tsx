import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createClass } from "@/api/createClass";
import { ClassForm } from "../../components/class-form/ClassForm";
import { Student } from "@/model/Student";
import { updateClassEnrollments } from "@/api/updateClassEnrollments";

type Props = {
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
};

export function CreateClassDialog(props: Props) {
  const [name, setName] = useState<string>("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const { data } = useQuery<Student[]>({ queryKey: ["students"] });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { id } = await createClass({ name });
      await updateClassEnrollments(
        id,
        selectedStudents.map((id) => Number(id))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      props.onIsOpenChange(false);
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  const activeStudents = data?.filter((student) => student.isActive) || [];

  const isInvalid = !name;

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onIsOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create class
          </DialogTitle>
          <DialogDescription>
            Input class data and click to submit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <ClassForm
            name={name}
            setName={setName}
            students={activeStudents}
            selectedStudents={selectedStudents}
            setSelectedStudents={setSelectedStudents}
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
      </DialogContent>
    </Dialog>
  );
}
