import { Request, Response } from 'express';

/* Librerias */
import { pool } from '../libs/mysql2';
import { bcrypt } from '../libs/bcryptJs';
import { jsonWebToken } from '../libs/jwt';

/* Helpers */
import { userFind } from '../utils/helpers/user/userFind';
import { getDataDB } from '../utils/helpers/getDataDB';

class AuthController {
  async login(req: Request, res: Response): Promise<Response<JSON>> {
    const { email, password } = req.body;

    try {
      const query = await pool.query(
        'SELECT password FROM users WHERE email = ?',
        [email]
      );

      /* Validando Existencia User */
      userFind.findUser(query[0]);

      /* Password User-DB */
      const passwordDB = getDataDB.init(query[0], 3, 14);

      /* Validate Passwords */
      const validatePassword = bcrypt.comparePassword(password, passwordDB);
      userFind.messageUserPassword(validatePassword);

      /* Consultas Independientes(NodeJS Es Non-Blocking) */
      const queryID = pool.query('SELECT id FROM users WHERE email = ?', [
        email,
      ]);
      const queryROLE = pool.query('SELECT role FROM users WHERE email = ?', [
        email,
      ]);
      const [idUser, roleUser] = await Promise.all([queryID, queryROLE]);

      /* Generar Un Token-User */
      const tokenUser = jsonWebToken.createToken(idUser[0], roleUser[0]);

      return res.json({
        ok: true,
        msg: 'Login Successfully',
        tokenUser,
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        msg: 'Login Not Successfully',
        error: e,
      });
    }
  }
}

export const authController = new AuthController();
