import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";

type Props<K> = {
  targets: K[];
  children?: React.ReactNode;
  targetMutation: ReturnType<typeof useMutation<unknown, Error, K[]>>;
  title: string;
  description: string;
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
};

export function ActOnManyDialog<K>(props: Props<K>) {
  const {
    targetMutation,
    targets,
    title,
    description,
    isOpen,
    onIsOpenChange,
    children,
  } = props;
  const { mutate, isPending } = targetMutation;
  function onSubmit() {
    mutate(targets);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onIsOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => onIsOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={isPending} onClick={onSubmit}>
            {isPending && <Loader2 className="animate-spin" />}Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
