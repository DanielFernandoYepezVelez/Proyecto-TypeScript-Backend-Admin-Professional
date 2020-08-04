"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonWebToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/* Helpers */
const getDataDB_1 = require("../utils/helpers/getDataDB");
class Jwt {
    createToken(...data) {
        /* Obtener id - role - UserDB */
        const idUser = getDataDB_1.getDataDB.init(data[0], 2, 7);
        // const roleUser = getDataDB.init(data[1], 3, 10);
        const payload = {
            idUser,
        };
        return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY || 'token_para_desarrollo', {
            expiresIn: '12h',
        });
    }
}
exports.jsonWebToken = new Jwt();
