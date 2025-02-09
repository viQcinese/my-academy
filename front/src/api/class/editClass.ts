import { Class } from "@/model/Class";
import { httpClient } from "../httpClient";

export async function editClass(
  id: number,
  classData: Partial<Class>
): Promise<Class> {
  return httpClient.put(`classes/${id}`, {
    body: { class: classData },
  });
}
