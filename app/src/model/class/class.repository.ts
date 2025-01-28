import { Class } from "./class.entity";

export interface ClassRepository {
  create(value: Class): Promise<Class>;
  findAll(): Promise<Class[]>;
  findById(id: string): Promise<Class | null>;
  update(value: Class): Promise<Class>;
}
