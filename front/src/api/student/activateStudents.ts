import { httpClient } from "../httpClient";

export async function activateStudents(ids: number[]): Promise<void> {
  return httpClient.patch<void>(`students/activate`, {
    body: { ids },
  });
}
