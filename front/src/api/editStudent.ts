import { Student } from "@/model/Student";

export async function editStudent(student: Partial<Student>): Promise<Student> {
  const response = await fetch(`http://localhost:3000/students/${student.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
