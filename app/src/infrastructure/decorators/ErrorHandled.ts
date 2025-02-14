import { NextFunction, Request, Response } from "express";

export function ErrorHandled(
  params?: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Record<string, () => void>
) {
  return function transformMethod(
    originalMethod: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) {
    return async function replacementMethod(
      this: unknown,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        return await originalMethod.call(this, req, res, next);
      } catch (error: any) {
        const errorHandlingRecord = params?.(req, res, next);
        const errorHandler = errorHandlingRecord?.[error.name];
        return errorHandler ? errorHandler() : next(error);
      }
    };
  };
}
