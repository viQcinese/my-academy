import { ClassRepository } from "../model/class/class.repository";
import { CreateClassDTO } from "../model/class/class.dto";
import { Class } from "../model/class/class.entity";
import { EnrollmentRepository } from "../model/enrollment/enrollment.repository";

type ClassListItem = Partial<Class> & {
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

  async createClass(dto: CreateClassDTO, userId: string): Promise<Class> {
    const createdClass = new Class(dto);
    return await this.classRepository.create(createdClass, userId);
  }

  async getClass(id: number, userId: string): Promise<Class | null> {
    return await this.classRepository.findById(id, userId);
  }

  async listClasses(userId: string): Promise<ClassListItem[]> {
    const classes = await this.classRepository.findAll(userId);
    const enrollmentsCount =
      await this.enrollmentRepository.countStudentsByClasses(
        classes.map((c) => c.id!),
        userId
      );

    return classes.map((c) => ({
      ...c,
      studentsCount: enrollmentsCount[c.id!] || 0,
    }));
  }

  async editClass(
    id: number,
    classData: Partial<Class>,
    userId: string
  ): Promise<Class> {
    return await this.classRepository.update(id, classData, userId);
  }

  async activateClasses(ids: number[], userId: string): Promise<number> {
    const count = await this.classRepository.activateClasses(ids, userId);
    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} students`);
    }
    return count;
  }

  async deactivateClasses(ids: number[], userId: string): Promise<number> {
    const count = await this.classRepository.deactivateClasses(ids, userId);
    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} students`);
    }
    return count;
  }
}
