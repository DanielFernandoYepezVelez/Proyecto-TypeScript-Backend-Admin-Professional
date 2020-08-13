import { Request, Response } from 'express';

/* Librerias */
import { pool } from '../libs/mysql2';

class SearchController {
  /* Busqueda Para Todas Las Tablas */
  async getTodo(req: Request, res: Response): Promise<Response<JSON>> {
    const { termino } = req.params;
    const busqueda = `%${termino}%`;

    try {
      /* Consultas Al Mismo Tiempo(NodeJS Es Non-Blocking) */
      const queryUsers = pool.query(
        'SELECT name FROM users WHERE name LIKE ?',
        [busqueda]
      );
      const queryDoctors = pool.query(
        'SELECT name FROM doctors WHERE name LIKE ?',
        [busqueda]
      );
      const queryHospitals = pool.query(
        'SELECT name FROM hospitals WHERE name LIKE ?',
        [busqueda]
      );
      const [users, doctors, hospitals] = await Promise.all([
        queryUsers,
        queryDoctors,
        queryHospitals,
      ]);

      return res.json({
        ok: true,
        users: users[0],
        doctors: doctors[0],
        hospitals: hospitals[0],
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async getTable(req: Request, res: Response): Promise<Response<JSON>> {
    const { table, termino } = req.params;
    const busqueda = `%${termino}%`;
    let query: object[] = [];

    try {
      switch (table) {
        case 'users':
          query = await pool.query('SELECT id, name, img, email, google, role, activate FROM users WHERE name LIKE ?', [
            busqueda,
          ]);
          break;

        case 'doctors':
          query = await pool.query(
            'SELECT doctors.id, doctors.name, users.name AS name_U, users.img AS img_U, hospitals.name AS name_H, hospitals.img AS img_H FROM doctors INNER JOIN users ON doctors.user_id = users.id INNER JOIN hospitals ON doctors.hospital_id = hospitals.id WHERE doctors.name LIKE ?',
            [busqueda]
          );
          break;

        case 'hospitals':
          query = await pool.query(
            'SELECT hospitals.id, hospitals.name, users.id AS id_U, users.name AS name_U FROM hospitals INNER JOIN users ON hospitals.user_id = users.id WHERE hospitals.name LIKE ?',
            [busqueda]
          );
          break;

        default:
          return res.status(400).json({
            ok: false,
            msg:
              'La Tabla Ingresada No Existe En La Base De Datos (users/doctors/hospitals)',
          });
          break;
      }

      return res.json({
        ok: true,
        data: query[0],
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }
}

export const searchController = new SearchController();
