import { Router } from "express";
import { PrismaStudentRepository } from "../repositories/prisma.student.repository";
import { StudentService } from "../../application/student.service";
import { StudentController } from "../controllers/student.controller";
import { prisma } from "../db/prisma.client";
import { PrismaEnrollmentRepository } from "../repositories/prisma.enrollment.repository";
import { EnrollmentService } from "../../application/enrollment.service";
import { PrismaClassRepository } from "../repositories/prisma.class.repository";

const studentRepository = new PrismaStudentRepository(prisma);
const enrollmentRepository = new PrismaEnrollmentRepository(prisma);
const classRepository = new PrismaClassRepository(prisma);
const enrollmentService = new EnrollmentService(
  enrollmentRepository,
  classRepository
);
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(
  studentService,
  enrollmentService
);

const studentRoutes = Router();

studentRoutes.post("/", (req, res, next) =>
  studentController.createStudent(req, res, next)
);
studentRoutes.get("/", (req, res, next) =>
  studentController.listStudents(req, res, next)
);
studentRoutes.get("/:id", (req, res, next) =>
  studentController.getStudent(req, res, next)
);
studentRoutes.put("/:id", (req, res, next) =>
  studentController.editStudent(req, res, next)
);
studentRoutes.patch("/activate", (req, res, next) =>
  studentController.activateStudents(req, res, next)
);
studentRoutes.patch("/deactivate", (req, res, next) =>
  studentController.deactivateStudents(req, res, next)
);

export { studentRoutes };
