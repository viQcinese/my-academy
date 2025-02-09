import { httpClient } from "../httpClient";

export async function activateClasses(ids: number[]): Promise<void> {
  return httpClient.patch(`classes/activate`, {
    body: { ids },
  });
}
