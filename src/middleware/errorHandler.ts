import logger from "@/utils/logger";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error("Unhandled error occurred:", err);

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
}
