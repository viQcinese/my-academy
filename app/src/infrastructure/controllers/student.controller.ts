import { EnrollmentService } from "../../application/enrollment.service";
import { StudentService } from "../../application/student.service";
import { NextFunction, Request, Response } from "express";
import { ErrorHandled } from "../decorators/ErrorHandled";

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

  @ErrorHandled()
  async createStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { firstName, lastName, birthdate, document, cellphone, email } =
      req.body;
    const userId = req.auth.sub;

    if (!firstName) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const student = await this.studentService.createStudent(
      {
        firstName,
        lastName,
        birthdate,
        document,
        cellphone,
        email,
        id: null,
        isActive: null,
      },
      userId
    );
    res.status(201).json(student);
  }

  @ErrorHandled()
  async editStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { student } = req.body;
    const userId = req.auth.sub;

    if (!student) {
      res.status(400).json({ error: "Invalid input" });
      return;
    }

    const updatedStudent = await this.studentService.editStudent(
      Number(id),
      student,
      userId
    );
    res.status(200).json(updatedStudent);
  }

  @ErrorHandled()
  async listStudents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.auth.sub;
    const students = await this.studentService.listStudents(userId);
    res.status(200).json(students);
  }

  @ErrorHandled()
  async getStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const userId = req.auth.sub;

    const student = await this.studentService.getStudent(Number(id), userId);
    const classes = await this.enrollmentService.listClassesByStudent(
      Number(id),
      userId
    );

    if (!student) {
      res.status(404).json({ error: "Student not found." });
      return;
    }

    res.status(200).json({ student, classes });
  }

  @ErrorHandled()
  async activateStudents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { ids } = req.body;
    const userId = req.auth.sub;

    const activateStudents = await this.studentService.activateStudents(
      ids,
      userId
    );
    res.status(200).json({ activateStudents });
  }

  @ErrorHandled()
  async deactivateStudents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { ids } = req.body;
    const userId = req.auth.sub;

    const deactivateStudents = await this.studentService.deactivateStudents(
      ids,
      userId
    );
    res.status(200).json({ deactivateStudents });
  }
}
