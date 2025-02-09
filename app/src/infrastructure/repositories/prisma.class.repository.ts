import { PrismaClient } from "@prisma/client";
import { ClassRepository } from "../../model/class/class.repository";
import { Class } from "../../model/class/class.entity";
import { CreateClassDTO } from "../../model/class/class.dto";

export class PrismaClassRepository implements ClassRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(inputClass: Class, userId: string): Promise<Class> {
    const savedClass = await this.prisma.class.create({
      data: {
        userId,
        name: inputClass.name,
        isActive: inputClass.isActive || true,
      },
    });

    return new Class(savedClass);
  }

  async findAll(userId: string): Promise<Class[]> {
    const classData = await this.prisma.class.findMany({
      where: { userId },
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
    });
    return classData.map((data) => new Class(data));
  }

  async findById(id: number, userId: string): Promise<Class | null> {
    const classData = await this.prisma.class.findUnique({
      where: { userId, id },
    });

    return classData ? new Class(classData) : null;
  }

  async update(
    id: number,
    classData: Partial<CreateClassDTO>,
    userId: string
  ): Promise<Class> {
    const updatedClass = await this.prisma.class.update({
      where: { userId, id },
      data: { name: classData.name },
    });

    return new Class(updatedClass);
  }

  async activateClasses(ids: number[], userId: string): Promise<number> {
    const { count } = await this.prisma.class.updateMany({
      where: { userId, id: { in: ids } },
      data: { isActive: true },
    });
    return count;
  }

  async deactivateClasses(ids: number[], userId: string): Promise<number> {
    const { count } = await this.prisma.class.updateMany({
      where: { userId, id: { in: ids } },
      data: { isActive: false },
    });
    return count;
  }
}
