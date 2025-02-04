import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Class } from "@/model/Class";
import { editClass } from "@/api/editClass";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  class: Class;
  goBack: () => void;
};

export function EditClass(props: Props) {
  const { goBack, class: studentClass } = props;
  const [name, setName] = useState<string>(studentClass.name);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => editClass(props.class.id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      queryClient.invalidateQueries({
        queryKey: ["class", props.class.id],
      });
      goBack();
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate();
  }

  const isInvalid = !name;

  return (
    <div>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Button variant="ghost" className="flex w-8 h-8" onClick={goBack}>
            <ChevronLeft />
          </Button>
          Edit Class
        </DialogTitle>
        <DialogDescription>
          Input class data and click to submit.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <div className="grid py-4 grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
            className="col-span-3"
          />
        </div>
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
    </div>
  );
}
