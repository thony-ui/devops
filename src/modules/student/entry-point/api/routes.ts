import { type Application, Router } from "express";
import { StudentRepository } from "../../domain/student.repository";
import { StudentService } from "../../domain/student.service";
import { StudentsController } from "../../domain/student.controller";

export function defineStudentRouter(expressApp: Application) {
  const studentRouter = Router();

  const studentRepository = new StudentRepository();
  const studentService = new StudentService(studentRepository);
  const studentController = new StudentsController(studentService);

  studentRouter.get("/students", studentController.getAllStudentsController);

  expressApp.use("/v1/api", studentRouter);
}
