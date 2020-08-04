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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
/* Libraries */
const mysql2_1 = require("../libs/mysql2");
const bcryptJs_1 = require("../libs/bcryptJs");
/* Helpers */
const emailFind_1 = require("../utils/helpers/email/emailFind");
const userFind_1 = require("../utils/helpers/user/userFind");
const getDataDB_1 = require("../utils/helpers/getDataDB");
class UserController {
    /* PAGINACIÓN SQL(IMPORTANTE) */
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let desde = Number(req.query.desde || 0);
            try {
                /* Consultas Lanzadas Al Mismo Tiempo(NodeJS Es Non-Blocking) */
                const queryPag = mysql2_1.pool.query('SELECT id, name, img, email, google, role, activate FROM users LIMIT 5 OFFSET ?', [desde]);
                const queryTotal = mysql2_1.pool.query('SELECT COUNT(DISTINCT id) AS Total FROM users');
                const [users, totalUsers] = yield Promise.all([queryPag, queryTotal]);
                return res.json({
                    ok: true,
                    users: users[0],
                    totalUsers: totalUsers[0],
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
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            try {
                const query = yield mysql2_1.pool.query('SELECT email FROM users WHERE email = ?', [newUser.email]);
                /* Validate Email Unique */
                emailFind_1.emailFind.userEmailFind(query[0]);
                /* Hash Password */
                const hashPassword = bcryptJs_1.bcrypt.hashPassword(newUser.password);
                newUser.password = hashPassword;
                yield mysql2_1.pool.query('INSERT INTO users SET ?', [newUser]);
                return res.json({
                    ok: true,
                    message: 'User Created Successfully',
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    msg: 'User Not Created Successfully',
                    error: e,
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.params;
            const _a = req.body, { password, google } = _a, updateUser = __rest(_a, ["password", "google"]);
            try {
                let query = yield mysql2_1.pool.query('SELECT email FROM users WHERE id = ?', [
                    user_id,
                ]);
                /* Validar Existencia User */
                userFind_1.userFind.findUser(query[0]);
                /* Obtener Email-User-DB */
                const emailDB = getDataDB_1.getDataDB.init(query[0], 3, 11);
                if (emailDB !== updateUser.email) {
                    query = yield mysql2_1.pool.query('SELECT email FROM users WHERE email = ?', [
                        updateUser.email,
                    ]);
                    /* Validar Email Entrante Unico */
                    emailFind_1.emailFind.userEmailFind(query[0]);
                }
                query = yield mysql2_1.pool.query('UPDATE users SET ? WHERE id = ?', [
                    updateUser,
                    user_id,
                ]);
                return res.json({
                    ok: true,
                    message: 'User Updated Successfully',
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    msg: 'User Not Updated Successfully',
                    error: e,
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.params;
            try {
                let query = yield mysql2_1.pool.query('SELECT id FROM users WHERE id = ?', [
                    user_id,
                ]);
                /* Validar Existencia User */
                userFind_1.userFind.findUser(query[0]);
                query = yield mysql2_1.pool.query('UPDATE users SET activate = FALSE WHERE id = ?', [user_id]);
                return res.status(400).json({
                    ok: true,
                    msg: 'User Deleted Successfully',
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    msg: 'User Not Deleted Successfully',
                    error: e,
                });
            }
        });
    }
}
exports.userController = new UserController();
