import { Class } from "@/model/Class";
import { httpClient } from "../httpClient";

export async function createClass(classData: Partial<Class>): Promise<Class> {
  return httpClient.post(`classes`, {
    body: classData,
  });
}
