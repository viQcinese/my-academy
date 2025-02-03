import { PrismaClient } from "@prisma/client";
import { StudentRepository } from "../../model/student/student.repository";
import { Student } from "../../model/student/student.entity";

export class PrismaStudentRepository implements StudentRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(student: Student): Promise<Student> {
    const savedStudent = await this.prisma.student.create({
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

    return new Student(savedStudent);
  }

  async findAll(): Promise<Student[]> {
    const studentData = await this.prisma.student.findMany();
    return studentData.map((data) => new Student(data));
  }

  async findById(id: number): Promise<Student | null> {
    const studentData = await this.prisma.student.findUnique({
      where: { id },
    });

    return studentData ? new Student(studentData) : null;
  }

  async activateStudents(ids: number[]): Promise<number> {
    const { count } = await this.prisma.student.updateMany({
      where: { id: { in: ids } },
      data: { isActive: true },
    });
    return count;
  }

  async deactivateStudents(ids: number[]): Promise<number> {
    const { count } = await this.prisma.student.updateMany({
      where: { id: { in: ids } },
      data: { isActive: false },
    });
    return count;
  }
}
