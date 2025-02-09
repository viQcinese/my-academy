import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      auth: {
        sub: string;
        email?: string;
        name?: string;
        [key: string]: any;
      };
    }
  }
}
