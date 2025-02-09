import { NextFunction, Request, Response } from "express";

export function errorHandlingMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ name: err.name, message: err.message });
  }
  res
    .status(500)
    .json({ name: "UnknownError", message: "Internal Server Error" });
}
