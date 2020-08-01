import jwt from 'jsonwebtoken';

/* Helpers */
import { getDataDB } from '../utils/helpers/getDataDB';

class Jwt {
  createToken(...data: any[]) {
    /* Obtener id - role - UserDB */
    const idUser = getDataDB.init(data[0], 2, 7);
    // const roleUser = getDataDB.init(data[1], 3, 10);

    const payload = {
      idUser,
      // roleUser,
    };

    return jwt.sign(
      payload,
      process.env.SECRET_KEY || 'token_para_desarrollo',
      {
        expiresIn: '12h',
      }
    );
  }
}

export const jsonWebToken = new Jwt();
