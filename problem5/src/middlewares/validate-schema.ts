import { Request, Response, NextFunction } from "express";
import { ObjectSchema, BaseValidationOptions } from "joi";

type ValidateType = "body" | "query" | "params";

export const validateSchema = (schema: ObjectSchema, type: ValidateType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options: BaseValidationOptions = {
        stripUnknown: true,
        convert: false,
      };
      req[type] = await schema.validateAsync(req[type], options);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateBody = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validateAsync(req.body, {
        stripUnknown: true,
        convert: false,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateQuery = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = await schema.validateAsync(req.query, {
        stripUnknown: true,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};
