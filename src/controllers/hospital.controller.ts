import { Request, Response } from 'express';

/* Librerias */
import { pool } from '../libs/mysql2';

/* Modelos */
import { IHospital } from '../utils/models/IHospital';

/* Helpers */
import { userFind } from '../utils/helpers/user/userFind';

class HospitalController {
  async getHopitals(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const query = await pool.query(
        'SELECT hospitals.id, hospitals.name, hospitals.img, hospitals.activate, hospitals.user_id, users.id AS id_U, users.name AS name_U, users.img AS img_U FROM hospitals INNER JOIN users ON hospitals.user_id = users.id'
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
    const user_id = req.user;
    const { hospital_id } = req.params;
    const updateHospital: IHospital = {
      user_id,
      ...req.body,
    };

    try {
      let query = await pool.query('SELECT id FROM hospitals WHERE id = ?', [
        hospital_id,
      ]);
      userFind.findUser(query[0]);

      query = await pool.query('UPDATE hospitals SET ? WHERE id = ?', [
        updateHospital,
        hospital_id,
      ]);

      return res.json({
        ok: true,
        msg: 'Hospital Updated Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        msg: 'Hospital NO Updated Succesfully',
        error: e,
      });
    }
  }

  async deleteHospital(req: Request, res: Response): Promise<Response<JSON>> {
    const { hospital_id } = req.params;

    try {
      let query = await pool.query('SELECT id FROM hospitals WHERE id = ?', [
        hospital_id,
      ]);
      userFind.findUser(query[0]);

      await pool.query('UPDATE hospitals SET activate = ? WHERE id = ?', [
        false,
        hospital_id,
      ]);

      return res.json({
        ok: true,
        msg: 'Hospital Deleted Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        msg: 'Hospital NO Deleted Successfully',
        error: e,
      });
    }
  }
}

export const hospitalController = new HospitalController();
