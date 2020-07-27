import { Request, Response } from 'express';

import { pool } from '../libs/mysql2';

import { IUser } from '../utils/models/IUser';

class UserController {
  async getUsers(req: Request, res: Response): Promise<Response<JSON>> {
    const query = await pool.query('SELECT * FROM users');

    return res.json({
      ok: true,
      users: query[0],
    });
  }

  async createUser(req: Request, res: Response): Promise<Response<JSON>> {
    const newUser: IUser = req.body;

    try {
      const query = await pool.query(
        'SELECT email FROM users WHERE email = ?',
        [newUser.email]
      );

      /* Validando Un Posible Doble Email */
      if (!(JSON.stringify(query[0]) === '[]')) {
        return res.status(400).json({
          ok: false,
          error: 'Email Already Exist!',
        });
      }

      // const query = await pool.query('INSERT INTO users SET = ?', [newUser]);

      return res.json({
        ok: true,
        message: 'User Created Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        message: 'User Not Created Successfully',
      });
    }
  }
}

export const userController = new UserController();
