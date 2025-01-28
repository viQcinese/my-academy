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

  async activate(userId: number): Promise<Student> {
    const user = await this.studentRepository.findById(userId);
    if (!user) throw new Error("User not found");

    user.activate();
    await this.studentRepository.update(user);
    return user;
  }

  async deactivate(userId: number): Promise<Student> {
    const user = await this.studentRepository.findById(userId);
    if (!user) throw new Error("User not found");

    user.deactivate();
    await this.studentRepository.update(user);
    return user;
  }
}
