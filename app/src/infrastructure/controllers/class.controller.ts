import { ClassService } from "../../application/class.service";
import { Request, Response } from "express";

export class ClassController {
  private classService: ClassService;

  constructor(classService: ClassService) {
    this.classService = classService;
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

    const foundClass = await this.classService.getClass(id);

    if (!foundClass) {
      res.status(404).json({ error: "Class not found." });
      return;
    }

    res.status(200).json(foundClass);
  }

  async activateClass(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const foundClass = await this.classService.activate(id);

    if (!foundClass) {
      res.status(404).json({ error: "Class not found." });
      return;
    }

    res.status(200).json(foundClass);
  }

  async deactivateClass(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const foundClass = await this.classService.deactivate(id);

    if (!foundClass) {
      res.status(404).json({ error: "Class not found." });
      return;
    }

    res.status(200).json(foundClass);
  }
}
