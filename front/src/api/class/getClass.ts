import { ClassDetails } from "@/model/ClassDetails";
import { httpClient } from "../httpClient";

export async function getClass(id: number): Promise<ClassDetails> {
  return httpClient.get(`classes/${id}`);
}
