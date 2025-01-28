import { ClassService } from "../../application/class.service";
import { Request, Response } from "express";
import { EnrollmentService } from "../../application/enrollment.service";

export class ClassController {
  private classService: ClassService;
  private enrollmentService: EnrollmentService;

  constructor(
    classService: ClassService,
    enrollmentService: EnrollmentService
  ) {
    this.classService = classService;
    this.enrollmentService = enrollmentService;
  }

  async createClass(req: Request, res: Response): Promise<void> {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const createdClass = await this.classService.createClass({
      name,
      id: null,
      isActive: null,
    });
    res.status(201).json(createdClass);
  }

  async listClasses(req: Request, res: Response): Promise<void> {
    const classess = await this.classService.listClasses();
    res.status(200).json(classess);
  }

  async getClass(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const foundClass = await this.classService.getClass(Number(id));
    const students = await this.enrollmentService.listStudentsByClass(
      Number(id)
    );

    if (!foundClass) {
      res.status(404).json({ error: "Class not found." });
      return;
    }

    res.status(200).json({
      class: foundClass,
      students,
    });
  }

  async activateClass(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const foundClass = await this.classService.activate(Number(id));

    if (!foundClass) {
      res.status(404).json({ error: "Class not found." });
      return;
    }

    res.status(200).json(foundClass);
  }

  async deactivateClass(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const foundClass = await this.classService.deactivate(Number(id));

    if (!foundClass) {
      res.status(404).json({ error: "Class not found." });
      return;
    }

    await this.enrollmentService.unenrollAllStudentsFromClass(Number(id));

    res.status(200).json(foundClass);
  }
}
