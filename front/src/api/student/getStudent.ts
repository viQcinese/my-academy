import { StudentDetails } from "@/model/StudentDetails";
import { httpClient } from "../httpClient";

export async function getStudent(id: number): Promise<StudentDetails> {
  return httpClient.get<StudentDetails>(`students/${id}`);
}
