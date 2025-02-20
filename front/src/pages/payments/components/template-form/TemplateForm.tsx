import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreatePaymentTemplateForm } from "@/model/PaymentTemplate";
import React from "react";

type Props = {
  form: CreatePaymentTemplateForm;
  setForm: React.Dispatch<React.SetStateAction<CreatePaymentTemplateForm>>;
};

export function TemplateForm(props: Props) {
  const { form, setForm } = props;

  return (
    <div>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label isRequired htmlFor="amount" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            type="string"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.currentTarget.value }))
            }
            value={form.name}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label isRequired htmlFor="amount" className="text-right">
            Amount
          </Label>
          <div className="col-span-3">
            <Input
              id="amount"
              type="number"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  amount: Number(e.currentTarget.value),
                }))
              }
              value={form.amount}
              className="col-span-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
