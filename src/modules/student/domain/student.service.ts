import { IStudentService } from "./student.interface";
import { IStudentModel } from "./student.model";
import { StudentRepository } from "./student.repository";
import { WithId } from "mongodb";

export class StudentService implements IStudentService {
  constructor(private studentRepository: StudentRepository) {}
  getAllStudentsService = async (): Promise<WithId<IStudentModel>[]> => {
    return this.studentRepository.getAllStudentsService();
  };
}
