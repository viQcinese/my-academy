import { getStudent } from "@/api/getStudent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { empty } from "@/constants/empty";
import { StudentDetails } from "@/model/StudentDetails";
import { Separator } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Props = {
  studentId: number;
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
};

export function StudentDetailsDialog(props: Props) {
  const { isOpen, onIsOpenChange, studentId } = props;
  const { data, error } = useQuery<StudentDetails>({
    queryKey: ["student", studentId],
    queryFn: () => getStudent(studentId),
  });

  useEffect(() => {
    if (error) {
      onIsOpenChange(false);
    }
  }, [error, onIsOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onIsOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {data?.student.firstName} {data?.student.lastName}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="birthdate" className="text-right">
              Birthdate
            </Label>
            <span className="text-sm">
              {data?.student.birthdate?.toString() || empty}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="document" className="text-right">
              Document
            </Label>
            <span className="text-sm col-span-3">
              {data?.student.document || empty}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cellphone" className="text-right">
              Cellphone
            </Label>
            <span className="text-sm col-span-3">
              {data?.student.cellphone || empty}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <span className="text-sm col-span-3">
              {data?.student.email || empty}
            </span>
          </div>
        </div>
        <Separator className="text-slate-500" />
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="birthdate" className="text-right">
            Classes
          </Label>
          <ul className="col-span-3">
            {data?.classes.length === 0 ? (
              <li className="text-sm">{empty}</li>
            ) : (
              data?.classes.map((studentClass) => (
                <li className="text-sm">{studentClass.name}</li>
              ))
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
