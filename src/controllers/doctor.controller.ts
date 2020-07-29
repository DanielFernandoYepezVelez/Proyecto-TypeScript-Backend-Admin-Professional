import { Request, Response } from 'express';

/* Librerias */
import { pool } from '../libs/mysql2';

/* Helpers */
import { hospitalFind } from '../utils/helpers/hospital/hospitalFind';

/* Modelos */
import { IDoctor } from '../utils/models/IDoctor';

class DoctorController {
  async getDoctors(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      const query = await pool.query(
        'SELECT doctors.id, doctors.name, doctors.user_id, doctors.hospital_id, users.id AS id_U, users.name AS name_U, hospitals.id AS id_H, hospitals.name AS name_H FROM doctors INNER JOIN users ON doctors.user_id = users.id INNER JOIN hospitals ON doctors.hospital_id = hospitals.id'
      );

      return res.json({
        ok: true,
        doctors: query[0],
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async createDoctor(req: Request, res: Response): Promise<Response<JSON>> {
    const newDoctor: IDoctor = {
      user_id: req.user,
      ...req.body,
    };

    try {
      let query = await pool.query('SELECT * FROM hospitals WHERE id = ?', [
        newDoctor.hospital_id,
      ]);

      /* Validar Hospital Exist DB */
      hospitalFind.findHospital(query[0]);

      await pool.query('INSERT INTO doctors SET ?', [newDoctor]);

      return res.json({
        ok: true,
        doctors: 'Doctor Created Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async updateDoctor(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        doctors: '',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        doctors: '',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }
}

export const doctorController = new DoctorController();
