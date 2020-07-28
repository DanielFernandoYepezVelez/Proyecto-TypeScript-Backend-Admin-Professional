import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../schemasJoi/User';

class UserValidation {
  async createUserValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { error } = await userSchema.createUserSchema().validate(req.body);

    if (!(error === undefined)) {
      return res.status(400).json({
        ok: false,
        error: error?.details[0].message,
      });
    }

    return next();
  }

  async loginUserValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { error } = await userSchema.loginUserSchema().validate(req.body);

    if (!(error === undefined)) {
      return res.status(400).json({
        ok: false,
        error: error?.details[0].message,
      });
    }

    return next();
  }

  async updateUserValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { error } = await userSchema.updateUserSchema().validate(req.body);

    if (!(error === undefined)) {
      return res.status(400).json({
        ok: false,
        error: error?.details[0].message,
      });
    }

    return next();
  }
}

export const userValidation = new UserValidation();
