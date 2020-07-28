import { Request, Response } from 'express';

/* Libraries */
import { pool } from '../libs/mysql2';
import { bcrypt } from '../libs/bcryptJs';

/* Helpers */
import { emailFind } from '../utils/helpers/email/emailFind';
import { userFind } from '../utils/helpers/user/userFind';
import { getDataDB } from '../utils/helpers/getDataDB';

/* Models */
import { IUser } from '../utils/models/IUser';

class UserController {
  async getUsers(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const query = await pool.query(
        'SELECT id, name, email, google, role, activate FROM users'
      );

      return res.json({
        ok: true,
        users: query[0],
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async createUser(req: Request, res: Response): Promise<Response<JSON>> {
    const newUser: IUser = req.body;

    try {
      const query = await pool.query(
        'SELECT email FROM users WHERE email = ?',
        [newUser.email]
      );

      /* Validate Email Unique */
      emailFind.userEmailFind(query[0]);

      /* Hash Password */
      const hashPassword = bcrypt.hashPassword(newUser.password);
      newUser.password = hashPassword;

      await pool.query('INSERT INTO users SET ?', [newUser]);

      return res.json({
        ok: true,
        message: 'User Created Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        msg: 'User Not Created Successfully',
        error: e,
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response<JSON>> {
    const { user_id } = req.params;
    const { password, google, ...updateUser }: IUser = req.body;

    try {
      let query = await pool.query('SELECT email FROM users WHERE id = ?', [
        user_id,
      ]);

      /* Validar Existencia User */
      userFind.findUser(query[0]);

      /* Obtener Email-User-DB */
      const emailDB = getDataDB.init(query[0], 3, 11);

      if (emailDB !== updateUser.email) {
        query = await pool.query('SELECT email FROM users WHERE email = ?', [
          updateUser.email,
        ]);

        /* Validar Email Entrante Unico */
        emailFind.userEmailFind(query[0]);
      }

      query = await pool.query('UPDATE users SET ? WHERE id = ?', [
        updateUser,
        user_id,
      ]);

      return res.json({
        ok: true,
        message: 'User Updated Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        msg: 'User Not Updated Successfully',
        error: e,
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response<JSON>> {
    const { user_id } = req.params;

    try {
      let query = await pool.query('SELECT id FROM users WHERE id = ?', [
        user_id,
      ]);

      /* Validar Existencia User */
      userFind.findUser(query[0]);

      query = await pool.query(
        'UPDATE users SET activate = FALSE WHERE id = ?',
        [user_id]
      );

      return res.status(400).json({
        ok: true,
        msg: 'User Deleted Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        msg: 'User Not Deleted Successfully',
        error: e,
      });
    }
  }
}

export const userController = new UserController();