import { mongoDB } from "../../../db/mongo";
import logger from "../../../utils/logger";
import { IStudentService } from "./student.interface";
import { WithId } from "mongodb";
import { IStudentModel } from "./student.model";

export class StudentRepository implements IStudentService {
  getAllStudentsService = async (): Promise<WithId<IStudentModel>[]> => {
    // Implementation for fetching all students from the database
    // This is just a placeholder implementation
    logger.info("Fetching all students from the database");
    const db = mongoDB();
    const students = await db
      .collection<IStudentModel>("students")
      .find()
      .toArray();
    return students;
  };
}
