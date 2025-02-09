import { Student } from "@/model/Student";
import { StudentFormData } from "@/pages/students/model/StudentFormData";
import { httpClient } from "../httpClient";

export async function editStudent(
  id: number,
  student: StudentFormData
): Promise<Student> {
  return httpClient.put<Student>(`students/${id}`, {
    body: { student },
  });
}
