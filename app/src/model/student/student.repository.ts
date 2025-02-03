import { Student } from "./student.entity";

export interface StudentRepository {
  create(student: Student): Promise<Student>;
  findAll(): Promise<Student[]>;
  findById(id: number): Promise<Student | null>;
  activateStudents(ids: number[]): Promise<number>;
  deactivateStudents(ids: number[]): Promise<number>;
}
