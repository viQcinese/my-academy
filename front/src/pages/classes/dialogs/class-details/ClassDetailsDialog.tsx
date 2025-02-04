import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { empty } from "@/constants/empty";
import { useQuery } from "@tanstack/react-query";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { getClass } from "@/api/getClass";
import { ClassDetails } from "@/model/ClassDetails";
import { EditClass } from "./EditClass";

type Props = {
  classId?: number;
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
};

export function ClassDetailsDialog(props: Props) {
  const { isOpen, onIsOpenChange, classId } = props;

  const [isEdit, setIsEdit] = useState(false);
  const { data, error } = useQuery<ClassDetails>({
    queryKey: ["class", classId],
    queryFn: classId ? () => getClass(classId) : undefined,
  });

  useEffect(() => {
    if (error) {
      onIsOpenChange(false);
    }
  }, [error, onIsOpenChange]);

  function onOpenChange(value: boolean) {
    if (value) {
      onIsOpenChange(true);
    } else {
      onIsOpenChange(false);
      setIsEdit(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {isEdit && data ? (
          <EditClass goBack={() => setIsEdit(false)} class={data.class} />
        ) : (
          <div>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {data?.class.name}
                <Button
                  variant="ghost"
                  className="flex w-8 h-8"
                  onClick={() => setIsEdit(true)}
                >
                  <EditIcon />
                </Button>
              </DialogTitle>
              <DialogDescription className="hidden">
                {data?.class.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="birthdate" className="text-right">
                  Name
                </Label>
                <span className="text-sm col-span-3">{data?.class.name}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="birthdate" className="text-right">
                Students
              </Label>
              <ul className="col-span-3">
                {data?.students.length === 0 ? (
                  <li className="text-sm">{empty}</li>
                ) : (
                  data?.students.map((student) => (
                    <li key={`class-${student.id}`} className="text-sm">
                      {student.firstName} {student.lastName}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
