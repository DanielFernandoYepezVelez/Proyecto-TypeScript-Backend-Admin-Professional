import Joi, { ObjectSchema, Schema } from '@hapi/joi';

class HospitalSchema {
  createHospitalSchema(): ObjectSchema<Schema> {
    return Joi.object({
      name: Joi.string().min(3).max(20).required(),
      image: Joi.string(),
    });
  }
}

export const hospitalSchema = new HospitalSchema();
