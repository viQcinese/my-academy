import { Router } from "express";
import { PrismaClassRepository } from "../repositories/prisma.class.repository";
import { ClassService } from "../../application/class.service";
import { ClassController } from "../controllers/class.controller";

const classRepository = new PrismaClassRepository();
const classService = new ClassService(classRepository);
const classController = new ClassController(classService);

const classRoutes = Router();

classRoutes.post("/", (req, res) => classController.createClass(req, res));
classRoutes.get("/", (req, res) => classController.listClasses(req, res));
classRoutes.get("/:id", (req, res) => classController.getClass(req, res));
classRoutes.patch("/:id/activate", (req, res) =>
  classController.activateClass(req, res)
);
classRoutes.patch("/:id/deactivate", (req, res) =>
  classController.deactivateClass(req, res)
);

export { classRoutes };
