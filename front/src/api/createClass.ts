import { Class } from "@/model/Class";

export async function createClass(classData: Partial<Class>): Promise<Class> {
  const response = await fetch("http://localhost:3000/classes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
