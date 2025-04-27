import { type Application, Router } from "express";
import * as mongoTestController from "../../domain/mongo-test.controller";

export function defineMongoDBTestRouter(expressApp: Application) {
  const MongoDBTestRouter = Router();

  MongoDBTestRouter.get(
    "/students",
    mongoTestController.getAllStudentsController
  );

  expressApp.use("/mongo-test", MongoDBTestRouter);
}
