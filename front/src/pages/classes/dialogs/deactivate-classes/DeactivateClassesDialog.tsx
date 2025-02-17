import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ActOnManyDialog } from "@/components/dialogs/act-on-many/ActOnManyDialog";
import { deactivateClasses } from "@/api/class/deactivateClasses";
import { Class } from "@/model/Class";

type Props = {
  classes: number[];
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
  onComplete: () => void;
};

export function DeactivateClassesDialog(props: Props) {
  const { isOpen, onIsOpenChange, onComplete, classes } = props;
  const { data } = useQuery<Class[]>({ queryKey: ["classes"] });
  const queryClient = useQueryClient();
  const deactivateClassesMutation = useMutation({
    mutationFn: deactivateClasses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      onIsOpenChange(false);
      onComplete();
    },
  });

  return (
    <ActOnManyDialog
      title="Activate"
      description="The following classes will be deactivated:"
      isOpen={isOpen}
      onIsOpenChange={onIsOpenChange}
      targetMutation={deactivateClassesMutation}
      targets={classes}
    >
      <ul>
        {classes.map((id) => {
          const currentClass = data?.find((student) => student.id === id);
          return (
            <li key={`class-to-activate-${id}`} className=" pl-4 text-sm">
              {currentClass?.name}
            </li>
          );
        })}
      </ul>
    </ActOnManyDialog>
  );
}
