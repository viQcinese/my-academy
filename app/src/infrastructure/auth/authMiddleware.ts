import { NextFunction, Request, Response } from "express";
import { expressjwt, GetVerificationKey } from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";

export const authMiddleware = expressjwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${process.env.AUTH_PROVIDER_DOMAIN}/.well-known/jwks.json`,
  }) as unknown as GetVerificationKey,
  audience: process.env.AUTH_PROVIDER_AUDIENCE,
  issuer: `https://${process.env.AUTH_PROVIDER_DOMAIN}/`,
  algorithms: ["RS256"],
});

export const authErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: err.name, message: err.message });
  }
};
