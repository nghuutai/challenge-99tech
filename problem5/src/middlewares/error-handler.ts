import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { HttpError } from "http-errors";
import { ValidationError } from "joi";

const presentValidationError = (errors: ValidationError) => {
  const { details } = errors;

  return {
    errors: details.map((detail) => ({
      message: detail.message,
    })),
  };
};

const presentErrors = (errors: Array<unknown>) => {
  return {
    errors: errors,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    next(res.status(400).json(presentValidationError(err)));
  }

  if (err instanceof HttpError) {
    next(res.status(err.statusCode).json(
      presentErrors([
        {
          message: err.message,
        },
      ])
    ));
  }

  next(res.status(500).json({
    errors: [
      {
        code: "internal_server_error",
        message: "something's wrong",
      },
    ],
  }));
};
