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
exports.authController = void 0;
/* Librerias */
const mysql2_1 = require("../libs/mysql2");
const bcryptJs_1 = require("../libs/bcryptJs");
const jwt_1 = require("../libs/jwt");
/* Helpers */
const userFind_1 = require("../utils/helpers/user/userFind");
const getDataDB_1 = require("../utils/helpers/getDataDB");
const googleVerify_1 = require("../utils/helpers/googleVerify");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const query = yield mysql2_1.pool.query('SELECT password FROM users WHERE email = ?', [email]);
                /* Validando Existencia User */
                userFind_1.userFind.findUser(query[0]);
                /* Password User-DB */
                const passwordDB = getDataDB_1.getDataDB.init(query[0], 3, 14);
                /* Validate Passwords */
                const validatePassword = bcryptJs_1.bcrypt.comparePassword(password, passwordDB);
                userFind_1.userFind.messageUserPassword(validatePassword);
                /* Consultas Lanzadas Al Mismo Tiempo(NodeJS Es Non-Blocking) */
                const queryID = mysql2_1.pool.query('SELECT id FROM users WHERE email = ?', [
                    email,
                ]);
                const queryROLE = mysql2_1.pool.query('SELECT role FROM users WHERE email = ?', [
                    email,
                ]);
                const [idUser, roleUser] = yield Promise.all([queryID, queryROLE]);
                /* Generar Un Token-User */
                const token = jwt_1.jsonWebToken.createToken(idUser[0], roleUser[0]);
                return res.json({
                    ok: true,
                    msg: 'Login Successfully',
                    token,
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Login Not Successfully',
                    error: e,
                });
            }
        });
    }
    /* LOGIN GOOGLE AL FINAL CON MI PROPIO TOKEN */
    loginGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenG = Object.assign({}, req.body);
            try {
                /* Lo Que Me Retorna Google Lo Destructuro */
                const { name, email, picture } = yield googleVerify_1.googleVerify.verifyToken(tokenG.google_token);
                /* Si Existe Este Email En La Base De Datos Obtengo ID */
                let query = yield mysql2_1.pool.query('SELECT id FROM users WHERE email = ?', [
                    email,
                ]);
                if (JSON.stringify(query[0]) === '[]') {
                    /* Crear Un Nuevo Usuario Si No Existe*/
                    /* Simepre Solo Puede Iniciar Sesion Con Google */
                    const newUser = {
                        name,
                        email,
                        password: 'N/A',
                        google: true,
                        img: picture,
                    };
                    yield mysql2_1.pool.query('INSERT INTO users SET ?', [newUser]);
                }
                else {
                    /* Si Existe Usuario, Entonces Se Registró Con Anterioridad Con Email Y Password(N/A Le Quita El Método De Autenticación Con Email Y Password, Pero Le Brinda Método De Autenticación Con Google)*/
                    const existUserId = getDataDB_1.getDataDB.init(query[0], 2, 7);
                    yield mysql2_1.pool.query('UPDATE users SET password = ?, google = ?, img = ? WHERE id = ?', ['N/A', true, picture, existUserId]);
                }
                query = yield mysql2_1.pool.query('SELECT id FROM users WHERE email = ?', [email]);
                /* Generar MI JsonWebToken(Para El Login) */
                const token = jwt_1.jsonWebToken.createToken(query[0]);
                return res.json({
                    ok: true,
                    token,
                    mgs: 'Google Successfully',
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    e,
                    mgs: 'Google NOT Successfully',
                });
            }
        });
    }
    renovarToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.user;
            try {
                const query = yield mysql2_1.pool.query('SELECT id FROM users WHERE id = ?', [id]);
                const token = jwt_1.jsonWebToken.createToken(query[0]);
                const user = yield mysql2_1.pool.query('SELECT id, name, img, email, google, role, activate, created_at FROM users WHERE id = ?', [id]);
                return res.json({
                    ok: true,
                    msg: 'token Renew',
                    token,
                    user: user[0],
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    error: e,
                    msg: 'token NOT Renew',
                });
            }
        });
    }
}
exports.authController = new AuthController();
