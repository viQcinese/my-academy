import { StudentRepository } from "../model/student/student.repository";
import { Student } from "../model/student/student.entity";
import { CreateStudentDTO } from "../model/student/student.dto";

export class StudentService {
  private studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  async createStudent(dto: CreateStudentDTO, userId: string): Promise<Student> {
    const student = new Student(dto);
    return await this.studentRepository.create(student, userId);
  }

  async getStudent(id: number, userId: string): Promise<Student | null> {
    return await this.studentRepository.findById(id, userId);
  }

  async editStudent(
    id: number,
    student: Student,
    userId: string
  ): Promise<Student> {
    return await this.studentRepository.updateStudent(id, student, userId);
  }

  async listStudents(userId: string): Promise<Student[]> {
    return await this.studentRepository.findAll(userId);
  }

  async activateStudents(ids: number[], userId: string): Promise<number> {
    const count = await this.studentRepository.activateStudents(ids, userId);

    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} students`);
    }

    return count;
  }

  async deactivateStudents(ids: number[], userId: string): Promise<number> {
    const count = await this.studentRepository.deactivateStudents(ids, userId);

    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} students`);
    }

    return count;
  }
}
