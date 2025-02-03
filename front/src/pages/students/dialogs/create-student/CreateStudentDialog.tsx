import { Dialog } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "@/api/createStudent";
import { StudentForm } from "../../components/student-form/StudentForm";
import { DialogContent } from "@radix-ui/react-dialog";

type Props = {
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
};

export function CreateStudentDialog(props: Props) {
  const queryClient = useQueryClient();
  const createStudentMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      props.onIsOpenChange(false);
    },
  });

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onIsOpenChange}>
      <DialogContent>
        <StudentForm mutation={createStudentMutation} />
      </DialogContent>
    </Dialog>
  );
}
