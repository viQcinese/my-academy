import { Class } from "../model/class/class.entity";
import { ClassRepository } from "../model/class/class.repository";
import { EnrollmentRepository } from "../model/enrollment/enrollment.repository";
import { Student } from "../model/student/student.entity";

export class EnrollmentService {
  private enrollmentRepository: EnrollmentRepository;
  private classRepository: ClassRepository;

  constructor(
    enrollmentRepository: EnrollmentRepository,
    classRepository: ClassRepository
  ) {
    this.enrollmentRepository = enrollmentRepository;
    this.classRepository = classRepository;
  }

  async enrollStudentsInClass(
    classId: number,
    studentIds: number[],
    userId: string
  ): Promise<number> {
    return await this.enrollmentRepository.enrollStudentsInClass(
      classId,
      studentIds,
      userId
    );
  }

  async updateEnrollments(
    classId: number,
    studentIds: number[],
    userId: string
  ): Promise<[number, number]> {
    return await this.enrollmentRepository.updateClassEnrollments(
      classId,
      studentIds,
      userId
    );
  }

  async unenrollStudentsFromClass(
    classId: number,
    studentIds: number[],
    userId: string
  ): Promise<number> {
    return await this.enrollmentRepository.unenrollStudentsFromClass(
      classId,
      studentIds,
      userId
    );
  }

  async unenrollAllStudentsFromClass(
    classId: number,
    userId: string
  ): Promise<number> {
    const classEntity = await this.classRepository.findById(classId, userId);

    if (!classEntity) {
      throw new Error("The class does not exist or is not active.");
    }

    return await this.enrollmentRepository.unenrollAllStudentsFromClass(
      classId,
      userId
    );
  }

  async listClassesByStudent(
    studentId: number,
    userId: string
  ): Promise<Class[]> {
    return await this.enrollmentRepository.listClassesByStudent(
      studentId,
      userId
    );
  }

  async listStudentsByClass(
    classId: number,
    userId: string
  ): Promise<Student[]> {
    return await this.enrollmentRepository.listStudentsByClass(classId, userId);
  }
}
