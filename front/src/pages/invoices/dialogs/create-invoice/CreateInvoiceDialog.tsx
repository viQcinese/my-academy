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
import { Student } from "@/model/Student";
import { CreateInvoiceForm } from "@/model/Invoice";
import { createInvoice } from "@/api/invoices/createInvoice";
import { InvoiceForm } from "../../components/invoice-form/InvoiceForm";

type Props = {
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
};

new Date();

function defaultInvoiceForm(): CreateInvoiceForm {
  const today = new Date();
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);

  return {
    amount: 0,
    studentIds: [],
    description: "",
    dueAt: sevenDaysLater.toISOString().split("T")[0],
  };
}

export function CreateInvoiceDialog(props: Props) {
  const { isOpen, onIsOpenChange } = props;
  const [form, setForm] = useState<CreateInvoiceForm>(defaultInvoiceForm);

  const { data } = useQuery<Student[]>({ queryKey: ["students"] });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await createInvoice(form);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      onIsOpenChange(false);
      setForm(defaultInvoiceForm);
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  const activeStudents = data?.filter((student) => student.isActive) || [];

  const isInvalid = !form.amount || form.studentIds.length === 0;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onIsOpenChange}
      onClose={() => setForm(defaultInvoiceForm())}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create invoice
          </DialogTitle>
          <DialogDescription>
            Input invoice data and click to submit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <InvoiceForm
            form={form}
            setForm={setForm}
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
      </DialogContent>
    </Dialog>
  );
}
