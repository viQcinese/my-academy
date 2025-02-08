import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { CreateInvoiceForm } from "@/model/Invoice";
import { Student } from "@/model/Student";
import React from "react";

type Props = {
  form: CreateInvoiceForm;
  setForm: React.Dispatch<React.SetStateAction<CreateInvoiceForm>>;
  students: Student[];
};

export function InvoiceForm(props: Props) {
  const { form, setForm, students } = props;

  return (
    <div>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label isRequired htmlFor="amount" className="text-right">
            Amount
          </Label>
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label isRequired htmlFor="students" className="text-right">
            Students
          </Label>
          <div className="col-span-3">
            <MultiSelect
              id="students"
              withSearchInput
              options={students.map((student) => ({
                value: student.id.toString(),
                label: `${student.firstName} ${student.lastName ?? ""}`,
              }))}
              defaultValue={form.studentIds}
              onValueChange={(studentIds) =>
                setForm((prev) => ({ ...prev, studentIds }))
              }
              value={form.studentIds}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="due-at" className="text-right">
            Due date
          </Label>
          <Input
            id="due-at"
            type="date"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                dueAt: e.currentTarget.value,
              }))
            }
            value={form.dueAt}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.currentTarget.value,
              }))
            }
            value={form.dueAt}
            className="col-span-3"
          />
        </div>
      </div>
    </div>
  );
}
