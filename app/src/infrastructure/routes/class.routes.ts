import { Router } from "express";
import { PrismaClassRepository } from "../repositories/prisma.class.repository";
import { ClassService } from "../../application/class.service";
import { ClassController } from "../controllers/class.controller";
import { prisma } from "../db/prisma.client";
import { PrismaEnrollmentRepository } from "../repositories/prisma.enrollment.repository";
import { EnrollmentService } from "../../application/enrollment.service";

const classRepository = new PrismaClassRepository(prisma);
const enrollmentrepository = new PrismaEnrollmentRepository(prisma);
const classService = new ClassService(classRepository, enrollmentrepository);

const enrollmentRepository = new PrismaEnrollmentRepository(prisma);
const enrollmentService = new EnrollmentService(
  enrollmentRepository,
  classRepository
);

const classController = new ClassController(classService, enrollmentService);

const classRoutes = Router();

classRoutes.post("/", (req, res) => classController.createClass(req, res));
classRoutes.get("/", (req, res) => classController.listClasses(req, res));
classRoutes.get("/:id", (req, res) => classController.getClass(req, res));
classRoutes.put("/:id", (req, res) => classController.updateClass(req, res));
classRoutes.put("/:id/enrollments", (req, res) =>
  classController.updateClassEnrollments(req, res)
);
classRoutes.patch("/activate", (req, res) =>
  classController.activateClasses(req, res)
);
classRoutes.patch("/deactivate", (req, res) =>
  classController.deactivateClasses(req, res)
);

export { classRoutes };
