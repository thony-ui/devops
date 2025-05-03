import { mongoDB } from "../../../db/mongo";
import logger from "../../../utils/logger";
import { IStudentService } from "./student.interface";
import { Document, WithId } from "mongodb";

export class StudentRepository implements IStudentService {
  getAllStudentsService = async (): Promise<WithId<Document>[]> => {
    // Implementation for fetching all students from the database
    // This is just a placeholder implementation
    logger.info("Fetching all students from the database");
    const db = mongoDB();
    const students = await db.collection("students").find().toArray();
    return students;
  };
}
