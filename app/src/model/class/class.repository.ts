import { Class } from "./class.entity";

export interface ClassRepository {
  create(value: Class, userId: string): Promise<Class>;
  findAll(userId: string): Promise<Class[]>;
  findById(id: number, userId: string): Promise<Class | null>;
  update(id: number, classData: Partial<Class>, userId: string): Promise<Class>;
  activateClasses(ids: number[], userId: string): Promise<number>;
  deactivateClasses(ids: number[], userId: string): Promise<number>;
}
