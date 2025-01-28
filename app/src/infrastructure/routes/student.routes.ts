import { Router } from "express";
import { PrismaStudentRepository } from "../repositories/prisma.student.repository";
import { StudentService } from "../../application/student.service";
import { StudentController } from "../controllers/student.controller";

const studentRepository = new PrismaStudentRepository();
const studentService = new StudentService(studentRepository);
const studentController = new StudentController(studentService);

const studentRoutes = Router();

studentRoutes.post("/", studentController.createStudent);
studentRoutes.get("/", studentController.listStudents);
studentRoutes.get("/:id", studentController.getStudent);
studentRoutes.patch("/:id/activate", studentController.activateStudent);
studentRoutes.patch("/:id/deactivate", studentController.deactivateStudent);

export { studentRoutes };
