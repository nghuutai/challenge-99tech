import { NextFunction, Request, Response } from "express";

type AsyncRequestHandler = (req: Request, res: Response, next?: NextFunction) => Promise<unknown>;

export const asyncHandler = (fn: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
