import { Student } from "@/model/Student";

export async function getStudents(): Promise<Student[]> {
  const response = await fetch("http://localhost:3000/students", {
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
