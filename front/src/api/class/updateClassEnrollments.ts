import { httpClient } from "../httpClient";

export async function updateClassEnrollments(
  classId: number,
  studentIds: number[]
): Promise<void> {
  return httpClient.put(`classes/${classId}/enrollments`, {
    body: { studentIds },
  });
}
