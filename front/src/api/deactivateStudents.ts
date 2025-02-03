export async function deactivateStudents(ids: number[]): Promise<void> {
  const response = await fetch("http://localhost:3000/students/deactivate", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
