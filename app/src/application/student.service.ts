import { StudentRepository } from "../model/student/student.repository";
import { Student } from "../model/student/student.entity";
import { CreateStudentDTO } from "../model/student/student.dto";

export class StudentService {
  private studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  async createStudent(dto: CreateStudentDTO): Promise<Student> {
    const student = new Student(dto);
    return await this.studentRepository.create(student);
  }

  async getStudent(id: number): Promise<Student | null> {
    return await this.studentRepository.findById(id);
  }

  async listStudents(): Promise<Student[]> {
    return await this.studentRepository.findAll();
  }

  async activateStudents(ids: number[]): Promise<void> {
    const count = await this.studentRepository.activateStudents(ids);

    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} students`);
    }
  }

  async deactivateStudents(ids: number[]): Promise<void> {
    const count = await this.studentRepository.deactivateStudents(ids);

    if (count !== ids.length) {
      throw new Error(`Failed to update ${ids.length - count} students`);
    }
  }
}
