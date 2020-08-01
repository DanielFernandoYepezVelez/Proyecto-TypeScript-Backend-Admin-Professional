import Joi, { ObjectSchema, Schema } from '@hapi/joi';

class HospitalSchema {
  createHospitalSchema(): ObjectSchema<Schema> {
    return Joi.object({
      name: Joi.string().min(3).max(50).required(),
      image: Joi.string(),
    });
  }

  updateHospitalSchema(): ObjectSchema<Schema> {
    return Joi.object({
      name: Joi.string().min(3).max(50).required(),
    });
  }
}

export const hospitalSchema = new HospitalSchema();
