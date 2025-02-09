import { httpClient } from "../httpClient";

export async function deactivateStudents(ids: number[]): Promise<void> {
  return httpClient.patch<void>(`students/deactivate`, {
    body: { ids },
  });
}
