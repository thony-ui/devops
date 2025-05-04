import type { Request, Response, NextFunction } from "express";
import logger from "../../../utils/logger";
import { StudentService } from "./student.service";

export class StudentsController {
  constructor(private studentService: StudentService) {}

  getAllStudentsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info("Fetching all students");
      const students = await this.studentService.getAllStudentsService();
      res.status(200).json(students);
    } catch (error) {
      logger.error("Error fetching students: ", error);
      next(error);
    }
  };
}
