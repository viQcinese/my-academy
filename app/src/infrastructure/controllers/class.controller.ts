import { ClassService } from "../../application/class.service";
import { NextFunction, Request, Response } from "express";
import { EnrollmentService } from "../../application/enrollment.service";
import { ErrorHandled } from "../decorators/ErrorHandled";

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

  @ErrorHandled()
  async createClass(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name } = req.body;
    const userId = req.auth.sub;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const createdClass = await this.classService.createClass(
      {
        name,
        id: null,
        isActive: null,
      },
      userId
    );
    res.status(201).json(createdClass);
  }

  @ErrorHandled()
  async listClasses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.auth.sub;
    const classess = await this.classService.listClasses(userId);
    res.status(200).json(classess);
  }

  @ErrorHandled()
  async getClass(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const userId = req.auth.sub;

    const foundClass = await this.classService.getClass(Number(id), userId);
    const students = await this.enrollmentService.listStudentsByClass(
      Number(id),
      userId
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

  @ErrorHandled()
  async activateClasses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { ids } = req.body;
    const userId = req.auth.sub;

    const activatedClasses = await this.classService.activateClasses(
      ids,
      userId
    );
    res.status(200).json({ activatedClasses });
  }

  @ErrorHandled()
  async deactivateClasses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { ids } = req.body;
    const userId = req.auth.sub;

    const deactivatedClasses = await this.classService.deactivateClasses(
      ids,
      userId
    );
    res.status(200).json({ deactivatedClasses });
  }

  @ErrorHandled()
  async updateClass(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { class: classData } = req.body;
    const userId = req.auth.sub;

    const updateClass = await this.classService.editClass(
      Number(id),
      classData,
      userId
    );
    res.status(200).json({ class: updateClass });
  }

  @ErrorHandled()
  async updateClassEnrollments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { studentIds } = req.body;
    const userId = req.auth.sub;

    const [deletedCount, createdCount] =
      await this.enrollmentService.updateEnrollments(
        Number(id),
        studentIds,
        userId
      );
    res.status(200).json({ deletedCount, createdCount });
  }
}
