import { Request, Response } from 'express';

/* Librerias */
import { pool } from '../libs/mysql2';

/* Modelos */
import { IHospital } from '../utils/models/IHospital';
import { use } from 'passport';

class HospitalController {
  async getHopitals(req: Request, res: Response): Promise<Response<JSON>> {
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

  async createHospital(req: Request, res: Response): Promise<Response<JSON>> {
    const newHospital: IHospital = req.body;
    newHospital.user_id = req.user;

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
