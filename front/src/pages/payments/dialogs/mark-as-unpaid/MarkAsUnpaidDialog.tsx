import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActOnManyDialog } from "@/components/dialogs/act-on-many/ActOnManyDialog";
import { markInvoicesAsUnaid } from "@/api/invoices/markInvoicesAsUnpaid";

type Props = {
  invoices: string[];
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
  onComplete: () => void;
};

export function MarkAsUnpaidDialog(props: Props) {
  const { isOpen, onIsOpenChange, onComplete, invoices } = props;
  const queryClient = useQueryClient();
  const markInvoicesAsPaidMutation = useMutation({
    mutationFn: markInvoicesAsUnaid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      onIsOpenChange(false);
      onComplete();
    },
  });

  return (
    <ActOnManyDialog
      title="Mark as paid"
      description="The following invoices will be marked as paid:"
      isOpen={isOpen}
      onIsOpenChange={onIsOpenChange}
      targetMutation={markInvoicesAsPaidMutation}
      targets={invoices}
    >
      <p>You have selected {invoices.length} invoices</p>
    </ActOnManyDialog>
  );
}
