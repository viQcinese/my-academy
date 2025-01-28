import { ClassRepository } from "../model/class/class.repository";
import { CreateClassDTO } from "../model/class/class.dto";
import { Class } from "../model/class/class.entity";

export class ClassService {
  private classRepository: ClassRepository;

  constructor(classRepository: ClassRepository) {
    this.classRepository = classRepository;
  }

  async createClass(dto: CreateClassDTO): Promise<Class> {
    const createdClass = new Class(dto);
    return await this.classRepository.create(createdClass);
  }

  async getClass(id: string): Promise<Class | null> {
    return await this.classRepository.findById(id);
  }

  async listClasses(): Promise<Class[]> {
    return await this.classRepository.findAll();
  }

  async activate(classId: string): Promise<Class> {
    const foundClass = await this.classRepository.findById(classId);
    if (!foundClass) throw new Error("Class not found");

    foundClass.activate();
    await this.classRepository.update(foundClass);
    return foundClass;
  }

  async deactivate(classId: string): Promise<Class> {
    const foundClass = await this.classRepository.findById(classId);
    if (!foundClass) throw new Error("Class not found");

    foundClass.deactivate();
    await this.classRepository.update(foundClass);
    return foundClass;
  }
}
