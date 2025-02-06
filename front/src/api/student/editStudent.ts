import { Student } from "@/model/Student";
import { StudentFormData } from "@/pages/students/model/StudentFormData";

export async function editStudent(
  id: number,
  student: StudentFormData
): Promise<Student> {
  const response = await fetch(`http://localhost:3000/students/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ student }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
