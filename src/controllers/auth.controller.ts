import { Request, Response } from 'express';

/* Librerias */
import { pool } from '../libs/mysql2';
import { bcrypt } from '../libs/bcryptJs';
import { jsonWebToken } from '../libs/jwt';

/* Helpers */
import { userFind } from '../utils/helpers/user/userFind';
import { getDataDB } from '../utils/helpers/getDataDB';
import { googleVerify } from '../utils/helpers/googleVerify';

/* Interfaces */
import { IGoogle } from '../utils/models/IGoogle';
import { IUser } from '../utils/models/IUser';

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

      /* Consultas Lanzadas Al Mismo Tiempo(NodeJS Es Non-Blocking) */
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

  /* LOGIN GOOGLE AL FINAL CON MI PROPIO TOKEN */
  async loginGoogle(req: Request, res: Response): Promise<Response<JSON>> {
    const token: IGoogle = {
      ...req.body,
    };

    try {
      /* Lo Que Me Retorna Google Lo Destructuro */
      const { name, email, picture }: any = await googleVerify.verifyToken(
        token.google_token
      );

      /* Si Existe Este Email En La Base De Datos Obtengo ID */
      let query = await pool.query('SELECT id FROM users WHERE email = ?', [
        email,
      ]);

      if (JSON.stringify(query[0]) === '[]') {
        /* Crear Un Nuevo Usuario Si No Existe*/
        /* Simepre Solo Puede Iniciar Sesion Con Google */
        const newUser: IUser = {
          name,
          email,
          password: 'N/A',
          google: true,
          img: picture,
        };

        await pool.query('INSERT INTO users SET ?', [newUser]);
      } else {
        /* Si Existe Usuario, Entonces Se Registró Con Anterioridad Con Email Y Password(N/A Le Quita El Método De Autenticación Con Email Y Password, Pero Le Brinda Método De Autenticación Con Google)*/
        const existUserId = getDataDB.init(query[0], 2, 7);

        await pool.query(
          'UPDATE users SET password = ?, google = ?, img = ? WHERE id = ?',
          ['N/A', true, picture, existUserId]
        );
      }

      query = await pool.query('SELECT id FROM users WHERE email = ?', [email]);

      /* Generar MI JsonWebToken(Para El Login) */
      const tokenMio = jsonWebToken.createToken(query[0]);

      return res.json({
        ok: true,
        tokenMio,
        mgs: 'Google Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        e,
        mgs: 'Google NOT Successfully',
      });
    }
  }

  async renovarToken(req: Request, res: Response): Promise<Response<JSON>> {
    const id = req.user;

    try {
      const query = await pool.query('SELECT id FROM users WHERE id = ?', [id]);
      const token = jsonWebToken.createToken(query[0]);

      return res.json({
        ok: true,
        msg: 'token Renew',
        tokenRenew: token,
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
        msg: 'token NOT Renew',
      });
    }
  }
}

export const authController = new AuthController();
