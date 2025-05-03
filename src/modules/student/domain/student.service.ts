import { IStudentService } from "./student.interface";
import { StudentRepository } from "./student.repository";
import { WithId, Document } from "mongodb";

export class StudentService implements IStudentService {
  constructor(private studentRepository: StudentRepository) {}
  getAllStudentsService = async (): Promise<WithId<Document>[]> => {
    return this.studentRepository.getAllStudentsService();
  };
}
