import { Request, Response, NextFunction } from 'express';

import { doctorSchema } from '../schemasJoi/Doctor';

class DoctorValidation {
  async createDoctorValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { error } = await doctorSchema
      .createDoctorSchema()
      .validate(req.body);

    if (!(error === undefined)) {
      return res.status(400).json({
        ok: false,
        error: error?.details[0].message,
      });
    }

    return next();
  }

  async updateDoctorValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { error } = await doctorSchema
      .updateDoctorSchema()
      .validate(req.body);

    if (!(error === undefined)) {
      return res.status(400).json({
        ok: false,
        error: error?.details[0].message,
      });
    }

    return next();
  }
}

export const doctorValidation = new DoctorValidation();
