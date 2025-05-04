import { StudentsController } from "../domain/student.controller";
import { IStudentModel } from "../domain/student.model";
import { StudentRepository } from "../domain/student.repository";
import { StudentService } from "../domain/student.service";
import { ObjectId } from "mongodb";
import type { Request, Response, NextFunction } from "express";

describe("Student service unit tests", () => {
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

describe("Student controller unit tests", () => {
  let studentController: StudentsController;
  let studentServiceMock: jest.Mocked<StudentService>;
  let request: Partial<Request>;
  let response: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    studentServiceMock = {
      getAllStudentsService: jest.fn(),
    } as unknown as jest.Mocked<StudentService>;
    request = {
      params: {},
      body: {},
      query: {},
    };
    response = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();
    studentController = new StudentsController(studentServiceMock);
  });

  it("should fetch all students", async () => {
    const mockStudents: IStudentModel[] = [
      { _id: new ObjectId(), name: "Alice", age: 21 },
      { _id: new ObjectId(), name: "Bob", age: 22 },
    ];

    studentServiceMock.getAllStudentsService.mockResolvedValue(mockStudents);

    await studentController.getAllStudentsController(
      request as Request,
      response as Response,
      nextFunction
    );

    expect(response.status).toHaveBeenCalledWith(200);
    expect(studentServiceMock.getAllStudentsService).toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith(mockStudents);
  });
});
