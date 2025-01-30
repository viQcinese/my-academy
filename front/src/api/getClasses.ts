import { Class } from "@/pages/students/model/Class";

export async function getClasses(): Promise<Class[]> {
  const response = await fetch("http://localhost:3000/classes", {
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
