import { PrismaClient } from "@prisma/client";
import { StudentRepository } from "../../model/student/student.repository";
import { Student } from "../../model/student/student.entity";

export class PrismaStudentRepository implements StudentRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(student: Student, userId: string): Promise<Student> {
    const savedStudent = await this.prisma.student.create({
      data: {
        userId,
        firstName: student.firstName,
        lastName: student.lastName,
        birthdate: student.birthdate,
        document: student.document,
        cellphone: student.cellphone,
        email: student.email,
        isActive: student.isActive || true,
      },
    });

    return new Student(savedStudent);
  }

  async updateStudent(
    id: number,
    student: Student,
    userId: string
  ): Promise<Student> {
    const updatedStudent = await this.prisma.student.update({
      where: { id, userId },
      data: {
        firstName: student.firstName,
        lastName: student.lastName,
        birthdate: student.birthdate,
        document: student.document,
        cellphone: student.cellphone,
        email: student.email,
        isActive: student.isActive || true,
      },
    });

    return new Student(updatedStudent);
  }

  async findAll(userId: string): Promise<Student[]> {
    const studentData = await this.prisma.student.findMany({
      where: { userId },
      orderBy: [{ isActive: "desc" }, { firstName: "asc" }],
    });
    return studentData.map((data) => new Student(data));
  }

  async findById(id: number, userId: string): Promise<Student | null> {
    const studentData = await this.prisma.student.findUnique({
      where: { id, userId },
    });

    return studentData ? new Student(studentData) : null;
  }

  async activateStudents(ids: number[], userId: string): Promise<number> {
    const { count } = await this.prisma.student.updateMany({
      where: { userId, id: { in: ids } },
      data: { isActive: true },
    });
    return count;
  }

  async deactivateStudents(ids: number[], userId: string): Promise<number> {
    const { count } = await this.prisma.student.updateMany({
      where: { userId, id: { in: ids } },
      data: { isActive: false },
    });
    return count;
  }
}
