"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchController = void 0;
/* Librerias */
const mysql2_1 = require("../libs/mysql2");
class SearchController {
    /* Busqueda Para Todas Las Tablas */
    getTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { termino } = req.params;
            const busqueda = `%${termino}%`;
            try {
                /* Consultas Al Mismo Tiempo(NodeJS Es Non-Blocking) */
                const queryUsers = mysql2_1.pool.query('SELECT name FROM users WHERE name LIKE ?', [busqueda]);
                const queryDoctors = mysql2_1.pool.query('SELECT name FROM doctors WHERE name LIKE ?', [busqueda]);
                const queryHospitals = mysql2_1.pool.query('SELECT name FROM hospitals WHERE name LIKE ?', [busqueda]);
                const [users, doctors, hospitals] = yield Promise.all([
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
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    error: e,
                });
            }
        });
    }
    getTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, termino } = req.params;
            const busqueda = `%${termino}%`;
            let query = [];
            try {
                switch (table) {
                    case 'users':
                        query = yield mysql2_1.pool.query('SELECT name FROM users WHERE name LIKE ?', [
                            busqueda,
                        ]);
                        break;
                    case 'doctors':
                        query = yield mysql2_1.pool.query('SELECT doctors.id, doctors.name, users.name AS name_U, users.img AS img_U, hospitals.name AS name_H, hospitals.img AS img_H FROM doctors INNER JOIN users ON doctors.user_id = users.id INNER JOIN hospitals ON doctors.hospital_id = hospitals.id WHERE doctors.name LIKE ?', [busqueda]);
                        break;
                    case 'hospitals':
                        query = yield mysql2_1.pool.query('SELECT hospitals.id, hospitals.name, users.id AS id_U, users.name AS name_U FROM hospitals INNER JOIN users ON hospitals.user_id = users.id WHERE hospitals.name LIKE ?', [busqueda]);
                        break;
                    default:
                        return res.status(400).json({
                            ok: false,
                            msg: 'La Tabla Ingresada No Existe En La Base De Datos (users/doctors/hospitals)',
                        });
                        break;
                }
                return res.json({
                    ok: true,
                    data: query[0],
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    error: e,
                });
            }
        });
    }
}
exports.searchController = new SearchController();
