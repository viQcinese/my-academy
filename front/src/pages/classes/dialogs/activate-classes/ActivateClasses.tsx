import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ActOnManyDialog } from "@/components/dialogs/act-on-many/ActOnManyDialog";
import { activateClasses } from "@/api/activateClasses";
import { Class } from "@/model/Class";

type Props = {
  classes: number[];
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
};

export function ActivateClassesDialog(props: Props) {
  const { isOpen, onIsOpenChange, classes } = props;
  const { data } = useQuery<Class[]>({ queryKey: ["classes"] });
  const queryClient = useQueryClient();
  const activateClassesMutation = useMutation({
    mutationFn: activateClasses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      onIsOpenChange(false);
    },
  });

  return (
    <ActOnManyDialog
      title="Activate"
      description="The following classes will be activated:"
      isOpen={isOpen}
      onIsOpenChange={onIsOpenChange}
      targetMutation={activateClassesMutation}
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
