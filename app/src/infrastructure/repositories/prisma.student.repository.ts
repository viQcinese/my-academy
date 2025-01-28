import { PrismaClient } from "@prisma/client";
import { StudentRepository } from "../../model/student/student.repository";
import { Student } from "../../model/student/student.entity";

export class PrismaStudentRepository implements StudentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
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

    student.id = savedStudent.id;
    return student;
  }

  async findAll(): Promise<Student[]> {
    const studentData = await this.prisma.student.findMany();
    return studentData.map((data) => new Student(data));
  }

  async findById(id: string): Promise<Student | null> {
    const studentData = await this.prisma.student.findUnique({
      where: { id: Number(id) },
    });

    return studentData ? new Student(studentData) : null;
  }

  async update(student: Student): Promise<Student> {
    const { id, ...otherProperties } = student;
    const updatedStudent = await this.prisma.student.update({
      where: { id: Number(id) },
      data: { ...otherProperties, isActive: otherProperties.isActive || true },
    });

    return new Student(updatedStudent);
  }
}
