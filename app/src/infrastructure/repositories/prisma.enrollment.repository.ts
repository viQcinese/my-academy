import { PrismaClient } from "@prisma/client";
import { EnrollmentRepository } from "../../model/enrollment/enrollment.repository";
import { Student } from "../../model/student/student.entity";
import { Class } from "../../model/class/class.entity";

export class PrismaEnrollmentRepository implements EnrollmentRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listClassesByStudent(
    studentId: number,
    userId: string
  ): Promise<Class[]> {
    const classesData = await this.prisma.enrollment.findMany({
      where: { studentId, userId },
      include: {
        class: true,
      },
    });
    return classesData.map((data) => new Class(data.class));
  }

  async listStudentsByClass(
    classId: number,
    userId: string
  ): Promise<Student[]> {
    const studentsData = await this.prisma.enrollment.findMany({
      where: { classId, userId },
      include: {
        student: true,
      },
    });
    return studentsData.map((data) => new Student(data.student));
  }

  async unenrollStudentsFromClass(
    classId: number,
    studentIds: number[],
    userId: string
  ): Promise<number> {
    const { count } = await this.prisma.enrollment.deleteMany({
      where: {
        userId,
        classId,
        studentId: { in: studentIds },
      },
    });
    return count;
  }

  async enrollStudentsInClass(
    classId: number,
    studentIds: number[],
    userId: string
  ): Promise<number> {
    const { count } = await this.prisma.enrollment.createMany({
      data: studentIds.map((studentId) => ({ studentId, classId, userId })),
      skipDuplicates: true,
    });
    return count;
  }

  async unenrollAllStudentsFromClass(classId: number, userId: string) {
    const { count } = await this.prisma.enrollment.deleteMany({
      where: { classId, userId },
    });
    return count;
  }

  async countStudentsByClasses(
    classIds: number[],
    userId: string
  ): Promise<Record<string, number>> {
    const counts = await this.prisma.enrollment.groupBy({
      by: ["classId"],
      where: { userId, classId: { in: classIds } },
      _count: { classId: true },
    });

    return counts.reduce((acc, { classId, _count }) => {
      acc[classId] = _count.classId;
      return acc;
    }, {} as Record<string, number>);
  }

  async findEnrollmentIdsByClassId(
    classId: number,
    userId: string
  ): Promise<number[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId, classId },
      select: { id: true },
    });
    return enrollments.map((enrollment) => enrollment.id);
  }

  async updateClassEnrollments(
    classId: number,
    studentIds: number[],
    userId: string
  ): Promise<[number, number]> {
    const [{ count: deletedCount }, { count: createdCount }] =
      await this.prisma.$transaction([
        this.prisma.enrollment.deleteMany({
          where: {
            classId,
            studentId: { notIn: studentIds },
          },
        }),
        this.prisma.enrollment.createMany({
          data: studentIds.map((studentId) => ({ userId, classId, studentId })),
          skipDuplicates: true,
        }),
      ]);
    return [deletedCount, createdCount];
  }
}
