import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaStudentRepository } from "../repositories/prisma.student.repository";
import { StudentService } from "../../application/student.service";
import { StudentController } from "../controllers/student.controller";

const studentRepository = new PrismaStudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

const studentRoutes = Router();

studentRoutes.post("/", (req, res) =>
  studentController.createStudent(req, res)
);
studentRoutes.get("/", (req, res) => studentController.listStudents(req, res));
studentRoutes.get("/:id", (req, res) => studentController.getStudent(req, res));
studentRoutes.patch("/:id/activate", (req, res) =>
  studentController.activateStudent(req, res)
);
studentRoutes.patch("/:id/deactivate", (req, res) =>
  studentController.deactivateStudent(req, res)
);

export { studentRoutes };
