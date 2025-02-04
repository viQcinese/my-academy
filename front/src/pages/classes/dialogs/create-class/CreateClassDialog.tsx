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
import { createClass } from "@/api/createClass";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
};

export function CreateClassDialog(props: Props) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
      props.onIsOpenChange(false);
    },
  });
  const [name, setName] = useState<string>("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate({ name });
  }

  const isInvalid = !name;

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onIsOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create class
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
      </DialogContent>
    </Dialog>
  );
}
