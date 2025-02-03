export async function activateStudents(studentIds: number[]): Promise<void> {
  const response = await fetch("http://localhost:3000/students/activate", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentIds }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
