import { StudentDetails } from "@/model/StudentDetails";

export async function getStudent(id: number): Promise<StudentDetails> {
  const response = await fetch(`http://localhost:3000/students/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
