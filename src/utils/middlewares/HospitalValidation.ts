import { Request, Response, NextFunction } from 'express';

import { hospitalSchema } from '../schemasJoi/Hospital';

class HospitalValidation {
  async createHospitalValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { error } = await hospitalSchema
      .createHospitalSchema()
      .validate(req.body);

    if (!(error === undefined)) {
      return res.status(400).json({
        ok: false,
        error: error?.details[0].message,
      });
    }

    return next();
  }

  async updateHospitalValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { error } = await hospitalSchema
      .updateHospitalSchema()
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

export const hospitalValidation = new HospitalValidation();
