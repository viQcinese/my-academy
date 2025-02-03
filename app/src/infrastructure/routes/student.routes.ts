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

studentRoutes.post("/", (req, res) =>
  studentController.createStudent(req, res)
);
studentRoutes.get("/", (req, res) => studentController.listStudents(req, res));
studentRoutes.get("/:id", (req, res) => studentController.getStudent(req, res));
studentRoutes.patch("/activate", (req, res) =>
  studentController.activateStudents(req, res)
);
studentRoutes.patch("/deactivate", (req, res) =>
  studentController.deactivateStudents(req, res)
);
studentRoutes.post("/:id/enroll", (req, res) =>
  studentController.enrollStudentInClass(req, res)
);
studentRoutes.post("/:id/unenroll", (req, res) =>
  studentController.unenrollStudentFromClass(req, res)
);

export { studentRoutes };
