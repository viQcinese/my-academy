import { Student } from "@/model/Student";
import { httpClient } from "../httpClient";

export async function createStudent(
  student: Partial<Student>
): Promise<Student> {
  return httpClient.post<Student>(`students`, {
    body: student,
  });
}
