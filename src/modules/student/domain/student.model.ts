import { ObjectId } from "mongodb";

export interface IStudentModel {
  _id: ObjectId;
  name: string;
  age: number;
}
