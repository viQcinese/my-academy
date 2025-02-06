import { getClasses } from "@/api/class/getClasses";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export function ClassesProvider(props: Props) {
  const { children } = props;
  useQuery({ queryKey: ["classes"], queryFn: getClasses });
  return children;
}
