import { NextFunction, Request, Response } from "express";

export function errorHandlingMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(console.log(err));
  console.log(console.log(req.headers));
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ name: err.name, message: err.message });
    return;
  }
  res
    .status(500)
    .json({ name: "UnknownError", message: "Internal Server Error" });
}
