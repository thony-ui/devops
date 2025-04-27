import { mongoDB } from "../../../config/mongo";
import logger from "../../../utils/logger";

export const getAllStudentsService = async () => {
  logger.info("Fetching all students from the database");
  // use MongoDB to get all students
  const db = mongoDB();
  const students = await db.collection("students").find().toArray();
  return students;
};
