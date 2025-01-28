import { CreateStudentDTO } from "./student.dto";
import { Student } from "./student.entity";

export interface StudentRepository {
  create(student: Student): Promise<Student>;
  findAll(): Promise<Student[]>;
  findById(id: string): Promise<Student | null>;
  update(student: Student): Promise<Student>;
}
