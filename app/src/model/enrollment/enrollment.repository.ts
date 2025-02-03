import { Class } from "../class/class.entity";
import { Student } from "../student/student.entity";

export interface EnrollmentRepository {
  enrollStudentInClass(studentId: number, classId: number): Promise<void>;
  unenrollStudentFromClass(studentId: number, classId: number): Promise<void>;
  unenrollAllStudentsFromClass(classId: number): Promise<void>;
  listClassesByStudent(studentId: number): Promise<Class[]>;
  listStudentsByClass(classId: number): Promise<Student[]>;
  countStudentsByClasses(classIds: number[]): Promise<Record<string, number>>;
}
