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
exports.hospitalController = void 0;
/* Librerias */
const mysql2_1 = require("../libs/mysql2");
/* Helpers */
const userFind_1 = require("../utils/helpers/user/userFind");
class HospitalController {
    getHopitals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield mysql2_1.pool.query('SELECT hospitals.id, hospitals.name, hospitals.img, hospitals.activate, hospitals.user_id, users.id AS id_U, users.name AS name_U, users.img AS img_U FROM hospitals INNER JOIN users ON hospitals.user_id = users.id');
                return res.json({
                    ok: true,
                    hospitals: query[0],
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
    createHospital(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newHospital = Object.assign({ user_id: req.user }, req.body);
            try {
                yield mysql2_1.pool.query('INSERT INTO hospitals SET ?', [newHospital]);
                return res.json({
                    ok: true,
                    msg: 'Hospital Created Successfully',
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
    updateHospital(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user;
            const { hospital_id } = req.params;
            const updateHospital = Object.assign({ user_id }, req.body);
            try {
                let query = yield mysql2_1.pool.query('SELECT id FROM hospitals WHERE id = ?', [
                    hospital_id,
                ]);
                userFind_1.userFind.findUser(query[0]);
                query = yield mysql2_1.pool.query('UPDATE hospitals SET ? WHERE id = ?', [
                    updateHospital,
                    hospital_id,
                ]);
                return res.json({
                    ok: true,
                    msg: 'Hospital Updated Successfully',
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Hospital NO Updated Succesfully',
                    error: e,
                });
            }
        });
    }
    deleteHospital(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hospital_id } = req.params;
            try {
                let query = yield mysql2_1.pool.query('SELECT id FROM hospitals WHERE id = ?', [
                    hospital_id,
                ]);
                userFind_1.userFind.findUser(query[0]);
                yield mysql2_1.pool.query('UPDATE hospitals SET activate = ? WHERE id = ?', [
                    false,
                    hospital_id,
                ]);
                return res.json({
                    ok: true,
                    msg: 'Hospital Deleted Successfully',
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Hospital NO Deleted Successfully',
                    error: e,
                });
            }
        });
    }
}
exports.hospitalController = new HospitalController();
