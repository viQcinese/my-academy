import { PrismaClient } from "@prisma/client";
import { ClassRepository } from "../../model/class/class.repository";
import { Class } from "../../model/class/class.entity";
import { CreateClassDTO } from "../../model/class/class.dto";

export class PrismaClassRepository implements ClassRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(inputClass: Class): Promise<Class> {
    const savedClass = await this.prisma.class.create({
      data: {
        name: inputClass.name,
        isActive: inputClass.isActive || true,
      },
    });

    return new Class(savedClass);
  }

  async findAll(): Promise<Class[]> {
    const classData = await this.prisma.class.findMany({
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
    });
    return classData.map((data) => new Class(data));
  }

  async findById(id: number): Promise<Class | null> {
    const classData = await this.prisma.class.findUnique({
      where: { id },
    });

    return classData ? new Class(classData) : null;
  }

  async update(id: number, classData: Partial<CreateClassDTO>): Promise<Class> {
    const updatedClass = await this.prisma.class.update({
      where: { id },
      data: { name: classData.name },
    });

    return new Class(updatedClass);
  }

  async activateClasses(ids: number[]): Promise<number> {
    const { count } = await this.prisma.class.updateMany({
      where: { id: { in: ids } },
      data: { isActive: true },
    });
    return count;
  }

  async deactivateClasses(ids: number[]): Promise<number> {
    const { count } = await this.prisma.class.updateMany({
      where: { id: { in: ids } },
      data: { isActive: false },
    });
    return count;
  }
}
