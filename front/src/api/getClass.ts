import { ClassDetails } from "@/model/ClassDetails";

export async function getClass(id: number): Promise<ClassDetails> {
  const response = await fetch(`http://localhost:3000/classes/${id}`, {
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
