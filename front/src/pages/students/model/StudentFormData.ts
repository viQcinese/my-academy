import { Student } from "@/model/Student";

export type StudentFormData = Omit<Student, "id" | "isActive">;
