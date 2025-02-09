import { Class } from "@/model/Class";
import { httpClient } from "../httpClient";

export async function getClasses(): Promise<Class[]> {
  return httpClient.get(`classes`);
}
