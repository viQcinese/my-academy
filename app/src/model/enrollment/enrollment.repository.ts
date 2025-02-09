import { Class } from "../class/class.entity";
import { Student } from "../student/student.entity";

export interface EnrollmentRepository {
  updateClassEnrollments(
    classId: number,
    studentIds: number[],
    userId: string
  ): Promise<[number, number]>;
  enrollStudentsInClass(
    classId: number,
    studentIds: number[],
    userId: string
  ): Promise<number>;
  unenrollStudentsFromClass(
    classId: number,
    studentIds: number[],
    userId: string
  ): Promise<number>;
  unenrollAllStudentsFromClass(
    classId: number,
    userId: string
  ): Promise<number>;
  listClassesByStudent(studentId: number, userId: string): Promise<Class[]>;
  listStudentsByClass(classId: number, userId: string): Promise<Student[]>;
  countStudentsByClasses(
    classIds: number[],
    userId: string
  ): Promise<Record<string, number>>;
}
