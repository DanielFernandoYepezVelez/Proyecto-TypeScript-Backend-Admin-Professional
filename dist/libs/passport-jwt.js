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
exports.passportJwt = void 0;
const passport_jwt_1 = require("passport-jwt");
class PassportJwt {
    constructor() {
        this.options = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY || 'token_para_desarrollo',
        };
    }
    nuevaStrategia() {
        return new passport_jwt_1.Strategy(this.options, (payloadFromJwt, done) => __awaiter(this, void 0, void 0, function* () {
            /* EN CASO DE SER NECESARIO HACER LO SIGUIENTE */
            /* Hago Una Consulta A La DB Por El Id Del Usuario Que Tengo En El Token, Que Guarde Anteriormente Al Momento De Crearlo En Su Respectivo Payload */
            /* const conn = await pool;
            const query = await conn.query('SELECT * FROM users WHERE id = ?', [
              payloadFromJwt.id,
            ]); */
            // const idUser = payloadFromJwt.idUser;
            // const roleUser = payloadFromJwt.roleUser;
            if (payloadFromJwt) {
                return done(null, payloadFromJwt.idUser);
            }
            return done(null, false);
        }));
    }
}
exports.passportJwt = new PassportJwt();
