import { Student } from "@/model/Student";
import { httpClient } from "../httpClient";

export async function getStudents(): Promise<Student[]> {
  return await httpClient.get<Student[]>("students");
}
