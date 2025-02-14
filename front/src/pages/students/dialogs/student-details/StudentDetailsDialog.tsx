import { getStudent } from "@/api/student/getStudent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { empty } from "@/constants/empty";
import { StudentDetails } from "@/model/StudentDetails";
import { useQuery } from "@tanstack/react-query";
import { EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { EditStudent } from "./EditStudent";
import { DialogDescription } from "@radix-ui/react-dialog";

type Props = {
  studentId?: number;
  isOpen: boolean;
  onIsOpenChange: (value: boolean) => void;
};

export function StudentDetailsDialog(props: Props) {
  const { isOpen, onIsOpenChange, studentId } = props;

  const [isEdit, setIsEdit] = useState(false);
  const { data, error } = useQuery<StudentDetails>({
    queryKey: ["student", studentId],
    queryFn: studentId ? () => getStudent(studentId) : undefined,
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
          <EditStudent goBack={() => setIsEdit(false)} student={data.student} />
        ) : (
          <div>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {data?.student.firstName} {data?.student.lastName}
                <Button
                  variant="ghost"
                  className="flex w-8 h-8"
                  onClick={() => setIsEdit(true)}
                >
                  <EditIcon />
                </Button>
              </DialogTitle>
              <DialogDescription className="hidden">
                {data?.student.firstName} {data?.student?.lastName}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="birthdate" className="text-right">
                  Birthdate
                </Label>
                <span className="text-sm col-span-3">
                  {data?.student.birthdate
                    ? Intl.DateTimeFormat("pt-br", {}).format(
                        new Date(data.student.birthdate)
                      )
                    : empty}
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
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="birthdate" className="text-right leading-none">
                Classes
              </Label>
              <ul className="col-span-3">
                {data?.classes.length === 0 ? (
                  <li className="text-sm">{empty}</li>
                ) : (
                  data?.classes.map((studentClass) => (
                    <li key={`class-${studentClass.id}`} className="text-sm">
                      {studentClass.name}
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
