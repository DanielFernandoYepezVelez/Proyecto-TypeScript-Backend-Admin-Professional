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

  loginUserSchema(): ObjectSchema<Schema> {
    return Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      password: Joi.string().min(4).max(70).required(),
    });
  }

  loginUserGoogleSchema(): ObjectSchema<Schema> {
    return Joi.object({
      google_token: Joi.string().required(),
    });
  }

  updateUserSchema(): ObjectSchema<Schema> {
    return Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      role: Joi.string().required(),
    });
  }
}

export const userSchema = new UserSchema();
