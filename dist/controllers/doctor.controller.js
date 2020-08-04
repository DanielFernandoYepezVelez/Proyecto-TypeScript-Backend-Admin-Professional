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
exports.doctorController = void 0;
/* Librerias */
const mysql2_1 = require("../libs/mysql2");
/* Helpers */
const hospitalFind_1 = require("../utils/helpers/hospital/hospitalFind");
const userFind_1 = require("../utils/helpers/user/userFind");
class DoctorController {
    getDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield mysql2_1.pool.query('SELECT doctors.id, doctors.name, doctors.img, doctors.activate, doctors.user_id, doctors.hospital_id, users.id AS id_U, users.name AS name_U, hospitals.id AS id_H, hospitals.name AS name_H FROM doctors INNER JOIN users ON doctors.user_id = users.id INNER JOIN hospitals ON doctors.hospital_id = hospitals.id');
                return res.json({
                    ok: true,
                    doctors: query[0],
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
    createDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDoctor = Object.assign({ user_id: req.user }, req.body);
            try {
                let query = yield mysql2_1.pool.query('SELECT * FROM hospitals WHERE id = ?', [
                    newDoctor.hospital_id,
                ]);
                /* Validar Hospital Exist DB */
                hospitalFind_1.hospitalFind.findHospital(query[0]);
                yield mysql2_1.pool.query('INSERT INTO doctors SET ?', [newDoctor]);
                return res.json({
                    ok: true,
                    doctors: 'Doctor Created Successfully',
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
    updateDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user;
            const { doctor_id } = req.params;
            const updateDoctor = Object.assign({ user_id }, req.body);
            try {
                let query = yield mysql2_1.pool.query('SELECT id FROM doctors WHERE id = ?', [
                    doctor_id,
                ]);
                userFind_1.userFind.findUser(query[0]);
                query = yield mysql2_1.pool.query('UPDATE doctors SET ? WHERE id = ?', [
                    updateDoctor,
                    doctor_id,
                ]);
                return res.json({
                    ok: true,
                    msg: 'Doctor Updated Successfully',
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Doctor NO Updated Succesfully',
                    error: e,
                });
            }
        });
    }
    deleteDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { doctor_id } = req.params;
            try {
                let query = yield mysql2_1.pool.query('SELECT id FROM doctors WHERE id = ?', [
                    doctor_id,
                ]);
                userFind_1.userFind.findUser(query[0]);
                yield mysql2_1.pool.query('UPDATE doctors SET activate = ? WHERE id = ?', [
                    false,
                    doctor_id,
                ]);
                return res.json({
                    ok: true,
                    msg: 'Doctor Deleted Successfully',
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Doctor NO Deleted Successfully',
                    error: e,
                });
            }
        });
    }
}
exports.doctorController = new DoctorController();
