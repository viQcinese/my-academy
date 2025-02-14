import { NextFunction, Request, Response } from "express";
import { expressjwt, GetVerificationKey } from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";

export const authMiddleware = expressjwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: false,
    jwksUri: `https://${process.env.AUTH_PROVIDER_DOMAIN}/.well-known/jwks.json`,
    timeout: 30000,
  }) as unknown as GetVerificationKey,
  audience: process.env.AUTH_PROVIDER_AUDIENCE,
  issuer: `https://${process.env.AUTH_PROVIDER_DOMAIN}/`,
  algorithms: ["RS256"],
});
