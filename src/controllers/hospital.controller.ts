import { Request, Response } from 'express';

/* Librerias */
import { pool } from '../libs/mysql2';

/* Modelos */
import { IHospital } from '../utils/models/IHospital';

class HospitalController {
  async getHopitals(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const query = await pool.query(
        'SELECT hospitals.id, hospitals.name, hospitals.user_id, users.id AS id_U, users.name AS name_U, users.img AS img_U FROM hospitals INNER JOIN users ON hospitals.user_id = users.id'
      );

      return res.json({
        ok: true,
        hospitals: query[0],
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async createHospital(req: Request, res: Response): Promise<Response<JSON>> {
    const newHospital: IHospital = {
      user_id: req.user,
      ...req.body,
    };

    try {
      await pool.query('INSERT INTO hospitals SET ?', [newHospital]);

      return res.json({
        ok: true,
        msg: 'Hospital Created Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async updateHospital(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        hospitals: '',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async deleteHospital(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        hospitals: '',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }
}

export const hospitalController = new HospitalController();
