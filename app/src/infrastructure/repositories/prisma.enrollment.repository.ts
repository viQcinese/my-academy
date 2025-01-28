import { PrismaClient } from "@prisma/client";
import { EnrollmentRepository } from "../../model/enrollment/enrollment.repository";
import { Student } from "../../model/student/student.entity";
import { Class } from "../../model/class/class.entity";

export class PrismaEnrollmentRepository implements EnrollmentRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listClassesByStudent(studentId: number): Promise<Class[]> {
    const classesData = await this.prisma.enrollment.findMany({
      where: { studentId },
      include: {
        class: true,
      },
    });
    return classesData.map((data) => new Class(data.class));
  }

  async listStudentsByClass(classId: number): Promise<Student[]> {
    const studentsData = await this.prisma.enrollment.findMany({
      where: { classId },
      include: {
        student: true,
      },
    });
    return studentsData.map((data) => new Student(data.student));
  }

  async unenrollStudentFromClass(studentId: number, classId: number) {
    await this.prisma.enrollment.deleteMany({
      where: {
        studentId,
        classId,
      },
    });
  }

  async enrollStudentInClass(studentId: number, classId: number) {
    await this.prisma.enrollment.create({
      data: {
        studentId,
        classId,
      },
    });
  }
}
