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

  it("should throw an error if repository fails", async () => {
    const error = new Error("Database error");
    studentRepositoryMock.getAllStudentsService.mockRejectedValue(error);

    await expect(studentService.getAllStudentsService()).rejects.toThrow(
      "Database error"
    );
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

  it("should pass error to nextFunction if service fails", async () => {
    const error = new Error("Service error");
    studentServiceMock.getAllStudentsService.mockRejectedValue(error);

    await studentController.getAllStudentsController(
      request as Request,
      response as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledWith(error);
    expect(response.status).not.toHaveBeenCalled();
    expect(response.json).not.toHaveBeenCalled();
  });
});
