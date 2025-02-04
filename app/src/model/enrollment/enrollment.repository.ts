import { Class } from "../class/class.entity";
import { Student } from "../student/student.entity";

export interface EnrollmentRepository {
  updateClassEnrollments(
    classId: number,
    studentIds: number[]
  ): Promise<[number, number]>;
  enrollStudentsInClass(classId: number, studentIds: number[]): Promise<number>;
  unenrollStudentsFromClass(
    classId: number,
    studentIds: number[]
  ): Promise<number>;
  unenrollAllStudentsFromClass(classId: number): Promise<void>;
  listClassesByStudent(studentId: number): Promise<Class[]>;
  listStudentsByClass(classId: number): Promise<Student[]>;
  countStudentsByClasses(classIds: number[]): Promise<Record<string, number>>;
}
