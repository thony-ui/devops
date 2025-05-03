import { Document, WithId } from "mongodb";

export interface IStudentService {
  getAllStudentsService: () => Promise<WithId<Document>[]>;
}
