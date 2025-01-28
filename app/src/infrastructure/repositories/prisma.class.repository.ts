import { PrismaClient } from "@prisma/client";
import { ClassRepository } from "../../model/class/class.repository";
import { Class } from "../../model/class/class.entity";

export class PrismaClassRepository implements ClassRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(inputClass: Class): Promise<Class> {
    const savedClass = await this.prisma.class.create({
      data: {
        name: inputClass.name,
        isActive: inputClass.isActive || true,
      },
    });

    inputClass.id = savedClass.id;
    return inputClass;
  }

  async findAll(): Promise<Class[]> {
    const classData = await this.prisma.class.findMany();
    return classData.map((data) => new Class(data));
  }

  async findById(id: string): Promise<Class | null> {
    const classData = await this.prisma.class.findUnique({
      where: { id: Number(id) },
    });

    return classData ? new Class(classData) : null;
  }

  async update(inputClass: Class): Promise<Class> {
    const { id, ...otherProperties } = inputClass;
    const updatedClass = await this.prisma.class.update({
      where: { id: Number(id) },
      data: { ...otherProperties, isActive: otherProperties.isActive || true },
    });

    return new Class(updatedClass);
  }
}
