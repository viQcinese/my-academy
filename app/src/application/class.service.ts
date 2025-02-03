import { ClassRepository } from "../model/class/class.repository";
import { CreateClassDTO } from "../model/class/class.dto";
import { Class } from "../model/class/class.entity";
import { EnrollmentRepository } from "../model/enrollment/enrollment.repository";

type ClassListItem = Class & {
  studentsCount: number;
};

export class ClassService {
  private classRepository: ClassRepository;
  private enrollmentRepository: EnrollmentRepository;

  constructor(
    classRepository: ClassRepository,
    enrollmentRepository: EnrollmentRepository
  ) {
    this.classRepository = classRepository;
    this.enrollmentRepository = enrollmentRepository;
  }

  async createClass(dto: CreateClassDTO): Promise<Class> {
    const createdClass = new Class(dto);
    return await this.classRepository.create(createdClass);
  }

  async getClass(id: number): Promise<Class | null> {
    return await this.classRepository.findById(id);
  }

  async listClasses(): Promise<ClassListItem[]> {
    const classes = await this.classRepository.findAll();
    const enrollmentsCount =
      await this.enrollmentRepository.countStudentsByClasses(
        classes.map((c) => c.id!)
      );

    return classes.map((c) => ({
      ...c,
      studentsCount: enrollmentsCount[c.id!] || 0,
    }));
  }

  async activate(classId: number): Promise<Class> {
    const foundClass = await this.classRepository.findById(classId);
    if (!foundClass) throw new Error("Class not found");

    foundClass.activate();
    await this.classRepository.update(foundClass);
    return foundClass;
  }

  async deactivate(classId: number): Promise<Class> {
    const foundClass = await this.classRepository.findById(classId);
    if (!foundClass) throw new Error("Class not found");

    foundClass.deactivate();
    await this.classRepository.update(foundClass);
    return foundClass;
  }
}
