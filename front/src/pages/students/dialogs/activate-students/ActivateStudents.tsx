import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activateStudents } from "@/api/student/activateStudents";
import { Student } from "@/model/Student";
import { ActOnManyDialog } from "@/components/dialogs/act-on-many/ActOnManyDialog";

type Props = {
  students: number[];
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
  onComplete: () => void;
};

export function ActivateStudentsDialog(props: Props) {
  const { isOpen, onIsOpenChange, onComplete, students } = props;
  const { data } = useQuery<Student[]>({ queryKey: ["students"] });
  const queryClient = useQueryClient();
  const activateStudentsMutation = useMutation({
    mutationFn: activateStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      onIsOpenChange(false);
      onComplete();
    },
  });

  return (
    <ActOnManyDialog
      title="Activate"
      description="The following students will be activated:"
      isOpen={isOpen}
      onIsOpenChange={onIsOpenChange}
      targetMutation={activateStudentsMutation}
      targets={students}
    >
      <ul>
        {students.map((id) => {
          const currentStudent = data?.find((student) => student.id === id);
          return (
            <li key={`student-to-activate-${id}`} className=" pl-4 text-sm">
              {currentStudent?.firstName} {currentStudent?.lastName}
            </li>
          );
        })}
      </ul>
    </ActOnManyDialog>
  );
}
