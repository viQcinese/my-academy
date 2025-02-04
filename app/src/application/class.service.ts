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

  async activateClasses(ids: number[]): Promise<number> {
    const count = await this.classRepository.activateClasses(ids);
    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} students`);
    }
    return count;
  }

  async deactivateClasses(ids: number[]): Promise<number> {
    const count = await this.classRepository.deactivateClasses(ids);
    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} students`);
    }
    return count;
  }
}
