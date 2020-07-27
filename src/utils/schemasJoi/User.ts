import Joi, { ObjectSchema, Schema } from '@hapi/joi';

class UserSchema {
  createUserSchema(): ObjectSchema<Schema> {
    return Joi.object({
      name: Joi.string().min(3).max(20).required(),
      password: Joi.string().min(4).max(70).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      image: Joi.string(),
    });
  }
}

export const userSchema = new UserSchema();
