import type { Request, Response, NextFunction } from "express";
import * as mongoTestService from "./mongo-test.service";
import logger from "@/utils/logger";

export const getAllStudentsController = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    logger.info("Fetching all students");
    const students = await mongoTestService.getAllStudentsService();
    res.status(200).json(students);
  } catch (error) {
    logger.error("Error fetching students: ", error);
    res.status(500).json({ message: "Error fetching students" });
  }
};
