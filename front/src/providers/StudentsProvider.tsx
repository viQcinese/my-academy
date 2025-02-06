import { getStudents } from "@/api/student/getStudents";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export function StudentsProvider(props: Props) {
  const { children } = props;
  useQuery({ queryKey: ["students"], queryFn: getStudents });
  return children;
}
