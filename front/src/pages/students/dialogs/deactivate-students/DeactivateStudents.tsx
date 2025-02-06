import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Student } from "@/model/Student";
import { ActOnManyDialog } from "@/components/dialogs/act-on-many/ActOnManyDialog";
import { deactivateStudents } from "@/api/student/deactivateStudents";

type Props = {
  students: number[];
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
};

export function DeactivateStudentsDialog(props: Props) {
  const { isOpen, onIsOpenChange, students } = props;
  const { data } = useQuery<Student[]>({ queryKey: ["students"] });
  const queryClient = useQueryClient();
  const activateStudentsMutation = useMutation({
    mutationFn: deactivateStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      onIsOpenChange(false);
    },
  });

  return (
    <ActOnManyDialog
      title="Deactivate"
      description="The following students will be deactivated:"
      isOpen={isOpen}
      onIsOpenChange={onIsOpenChange}
      targetMutation={activateStudentsMutation}
      targets={students}
    >
      <ul>
        {students.map((id) => {
          const currentStudent = data?.find((student) => student.id === id);
          return (
            <li key={`student-to-deactivate-${id}`} className=" pl-4 text-sm">
              {currentStudent?.firstName} {currentStudent?.lastName}
            </li>
          );
        })}
      </ul>
    </ActOnManyDialog>
  );
}
