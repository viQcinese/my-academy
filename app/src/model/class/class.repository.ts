import { Class } from "./class.entity";

export interface ClassRepository {
  create(value: Class): Promise<Class>;
  findAll(): Promise<Class[]>;
  findById(id: number): Promise<Class | null>;
  update(id: number, classData: Partial<Class>): Promise<Class>;
  activateClasses(ids: number[]): Promise<number>;
  deactivateClasses(ids: number[]): Promise<number>;
}
