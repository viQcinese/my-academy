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

  async unenrollStudentsFromClass(
    classId: number,
    studentIds: number[]
  ): Promise<number> {
    const { count } = await this.prisma.enrollment.deleteMany({
      where: {
        classId,
        studentId: { in: studentIds },
      },
    });
    return count;
  }

  async enrollStudentsInClass(
    classId: number,
    studentIds: number[]
  ): Promise<number> {
    const { count } = await this.prisma.enrollment.createMany({
      data: studentIds.map((studentId) => ({ studentId, classId })),
      skipDuplicates: true,
    });
    return count;
  }

  async unenrollAllStudentsFromClass(classId: number) {
    await this.prisma.enrollment.deleteMany({
      where: { classId },
    });
  }

  async countStudentsByClasses(
    classIds: number[]
  ): Promise<Record<string, number>> {
    const counts = await this.prisma.enrollment.groupBy({
      by: ["classId"],
      where: { classId: { in: classIds } },
      _count: { classId: true },
    });

    return counts.reduce((acc, { classId, _count }) => {
      acc[classId] = _count.classId;
      return acc;
    }, {} as Record<string, number>);
  }

  async findEnrollmentIdsByClassId(classId: number): Promise<number[]> {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { classId },
      select: { id: true },
    });
    return enrollments.map((enrollment) => enrollment.id);
  }

  async updateClassEnrollments(
    classId: number,
    studentIds: number[]
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
          data: studentIds.map((studentId) => ({ classId, studentId })),
          skipDuplicates: true,
        }),
      ]);
    return [deletedCount, createdCount];
  }
}
