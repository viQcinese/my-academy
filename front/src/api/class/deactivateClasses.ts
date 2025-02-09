import { httpClient } from "../httpClient";

export async function deactivateClasses(ids: number[]): Promise<void> {
  return httpClient.patch(`classes/deactivate`, {
    body: { ids },
  });
}
