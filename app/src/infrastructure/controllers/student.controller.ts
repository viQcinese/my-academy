import { EnrollmentService } from "../../application/enrollment.service";
import { StudentService } from "../../application/student.service";
import { Request, Response } from "express";

export class StudentController {
  private studentService: StudentService;
  private enrollmentService: EnrollmentService;

  constructor(
    studentService: StudentService,
    enrollmentService: EnrollmentService
  ) {
    this.studentService = studentService;
    this.enrollmentService = enrollmentService;
  }

  async createStudent(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, birthdate, document, cellphone, email } =
      req.body;

    if (!firstName) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const student = await this.studentService.createStudent({
      firstName,
      lastName,
      birthdate,
      document,
      cellphone,
      email,
      id: null,
      isActive: null,
    });
    res.status(201).json(student);
  }

  async listStudents(req: Request, res: Response): Promise<void> {
    const students = await this.studentService.listStudents();
    res.status(200).json(students);
  }

  async getStudent(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const student = await this.studentService.getStudent(Number(id));

    if (!student) {
      res.status(404).json({ error: "Student not found." });
      return;
    }

    res.status(200).json(student);
  }

  async activateStudent(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const student = await this.studentService.activate(Number(id));

    if (!student) {
      res.status(404).json({ error: "Student not found." });
      return;
    }

    res.status(200).json(student);
  }

  async deactivateStudent(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const student = await this.studentService.deactivate(Number(id));

    if (!student) {
      res.status(404).json({ error: "Student not found." });
      return;
    }

    res.status(200).json(student);
  }

  async enrollStudentInClass(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { classId } = req.query;

    this.enrollmentService.enrollStudentInClass(Number(id), Number(classId));
  }

  async unenrollStudentFromClass(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { classId } = req.query;

    this.enrollmentService.unenrollStudentFromClass(
      Number(id),
      Number(classId)
    );
  }
}
