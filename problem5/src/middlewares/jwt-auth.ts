import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

const getBearerToken = (authHeader: string | undefined) => {
  if (!authHeader) {
    throw new createError.Forbidden();
  }

  const [authType, authToken] = authHeader.split(" ");
  if (authType !== "Bearer" || !authToken) {
    throw new createError.Forbidden();
  }

  return authToken;
};

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = getBearerToken(req.headers["authorization"]);
    
    // TODO: Decode auth token

    return next();
  } catch (err) {
    if (err instanceof createError.HttpError && err.statusCode === 403) {
      return next(err);
    }

    throw new createError.Unauthorized();
  }
};
