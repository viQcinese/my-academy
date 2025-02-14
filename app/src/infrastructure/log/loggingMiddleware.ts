import { NextFunction, Request, Response } from "express";

export function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`${req.auth?.email} - ${req.method} ${req.originalUrl}`);
  next();
}
