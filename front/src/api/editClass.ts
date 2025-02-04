import { Class } from "@/model/Class";

export async function editClass(
  id: number,
  classData: Partial<Class>
): Promise<Class> {
  const response = await fetch(`http://localhost:3000/classes/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ class: classData }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
