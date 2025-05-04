import { IStudentModel } from "../domain/student.model";
import { StudentRepository } from "../domain/student.repository";
import { StudentService } from "../domain/student.service";
import { ObjectId } from "mongodb";

describe("Student Unit Tests", () => {
  let studentService: StudentService;
  let studentRepositoryMock: jest.Mocked<StudentRepository>;

  beforeAll(() => {
    studentRepositoryMock = {
      getAllStudentsService: jest.fn(),
    } as unknown as jest.Mocked<StudentRepository>;

    studentService = new StudentService(studentRepositoryMock);
  });

  it("should fetch all students", async () => {
    const mockStudents: IStudentModel[] = [
      { _id: new ObjectId(), name: "Alice", age: 21 },
      { _id: new ObjectId(), name: "Bob", age: 22 },
    ];

    studentRepositoryMock.getAllStudentsService.mockResolvedValue(mockStudents);

    const students = await studentService.getAllStudentsService();

    expect(students).toEqual(mockStudents);
    expect(studentRepositoryMock.getAllStudentsService).toHaveBeenCalled();
  });
});
