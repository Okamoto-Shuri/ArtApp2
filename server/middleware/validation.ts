import { Request, Response, NextFunction } from 'express';
import { ApiError } from './error';

export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw ApiError.badRequest(error.details[0].message);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};