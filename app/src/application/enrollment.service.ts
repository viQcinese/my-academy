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
    studentIds: number[]
  ): Promise<number> {
    return await this.enrollmentRepository.enrollStudentsInClass(
      classId,
      studentIds
    );
  }

  async updateEnrollments(
    classId: number,
    studentIds: number[]
  ): Promise<[number, number]> {
    return await this.enrollmentRepository.updateClassEnrollments(
      classId,
      studentIds
    );
  }

  async unenrollStudentsFromClass(
    classId: number,
    studentIds: number[]
  ): Promise<number> {
    return await this.enrollmentRepository.unenrollStudentsFromClass(
      classId,
      studentIds
    );
  }

  async unenrollAllStudentsFromClass(classId: number): Promise<void> {
    const classEntity = await this.classRepository.findById(classId);

    if (!classEntity) {
      throw new Error("The class does not exist or is not active.");
    }

    await this.enrollmentRepository.unenrollAllStudentsFromClass(classId);
  }

  async listClassesByStudent(studentId: number): Promise<Class[]> {
    return await this.enrollmentRepository.listClassesByStudent(studentId);
  }

  async listStudentsByClass(classId: number): Promise<Student[]> {
    return await this.enrollmentRepository.listStudentsByClass(classId);
  }
}
