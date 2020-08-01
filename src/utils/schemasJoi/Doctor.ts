import Joi, { ObjectSchema, Schema } from '@hapi/joi';

class DoctorSchema {
  createDoctorSchema(): ObjectSchema<Schema> {
    return Joi.object({
      name: Joi.string().min(3).max(20).required(),
      hospital_id: Joi.string().min(1).required(),
      image: Joi.string(),
    });
  }

  updateDoctorSchema(): ObjectSchema<Schema> {
    return Joi.object({
      name: Joi.string().min(3).max(20).required(),
      /* hospital_id: Joi.string().min(1).required(),
      image: Joi.string(), */
    });
  }
}

export const doctorSchema = new DoctorSchema();
