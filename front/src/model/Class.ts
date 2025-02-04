import { Student } from "./Student";

export type Class = {
  id: number;
  name: string;
  isActive: boolean;
  studentsCount: number;
};

export type ClasseEnriched = Class & {
  students: Student[];
};
