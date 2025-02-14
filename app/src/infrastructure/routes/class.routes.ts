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

classRoutes.post("/", (req, res, next) =>
  classController.createClass(req, res, next)
);
classRoutes.get("/", (req, res, next) =>
  classController.listClasses(req, res, next)
);
classRoutes.get("/:id", (req, res, next) =>
  classController.getClass(req, res, next)
);
classRoutes.put("/:id", (req, res, next) =>
  classController.updateClass(req, res, next)
);
classRoutes.put("/:id/enrollments", (req, res, next) =>
  classController.updateClassEnrollments(req, res, next)
);
classRoutes.patch("/activate", (req, res, next) =>
  classController.activateClasses(req, res, next)
);
classRoutes.patch("/deactivate", (req, res, next) =>
  classController.deactivateClasses(req, res, next)
);

export { classRoutes };
