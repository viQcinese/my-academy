import { Student } from "./student.entity";

export interface StudentRepository {
  create(student: Student, userId: string): Promise<Student>;
  findAll(userId: string): Promise<Student[]>;
  findById(id: number, userId: string): Promise<Student | null>;
  updateStudent(id: number, student: Student, userId: string): Promise<Student>;
  activateStudents(ids: number[], userId: string): Promise<number>;
  deactivateStudents(ids: number[], userId: string): Promise<number>;
}
