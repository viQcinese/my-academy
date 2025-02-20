import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { CreatePaymentTemplateForm } from "@/model/PaymentTemplate";
import { createTemplate } from "@/api/templates/createTemplate";
import { TemplateForm } from "../../components/template-form/TemplateForm";

type Props = {
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
  onComplete: () => void;
};

function defaultForm(): CreatePaymentTemplateForm {
  return {
    name: "",
    amount: 0,
  };
}

export function CreateTemplateDialog(props: Props) {
  const { isOpen, onIsOpenChange, onComplete } = props;
  const [form, setForm] = useState<CreatePaymentTemplateForm>(defaultForm);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => await createTemplate(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      onIsOpenChange(false);
      setForm(defaultForm);
      onComplete();
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  const isInvalid = !form.name || !form.amount;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onIsOpenChange}
      onClose={() => setForm(defaultForm)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create payment template
          </DialogTitle>
          <DialogDescription>Input data and click to submit</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <TemplateForm form={form} setForm={setForm} />
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
