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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unaSolaImgDB = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/* Librerias */
const mysql2_1 = require("../../../libs/mysql2");
/* Helpers */
const userFind_1 = require("../user/userFind");
const getDataDB_1 = require("../getDataDB");
class UnaSolaImgDB {
    constructor() {
        this.nameImgDB = '';
        this.imgExistente = '';
        this.query = [];
    }
    saveImage(tipo, id, nombreArchivo) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (tipo) {
                case 'users':
                    this.query = yield mysql2_1.pool.query('SELECT img FROM users WHERE id = ?', [
                        id,
                    ]);
                    /* Existencia ID */
                    userFind_1.userFind.findUser(this.query[0]);
                    /* Name Image PATH */
                    this.nameImgDB = getDataDB_1.getDataDB.init(this.query[0], 3, 9);
                    this.imgExistente = this.pathServer(tipo, this.nameImgDB);
                    this.deleteImgServer(this.imgExistente);
                    /* Guardar Nombre Imagen En La DB*/
                    this.query = yield mysql2_1.pool.query('UPDATE users SET img = ? WHERE id = ?', [
                        nombreArchivo,
                        id,
                    ]);
                    return true;
                    break;
                case 'doctors':
                    this.query = yield mysql2_1.pool.query('SELECT img FROM doctors WHERE id = ?', [
                        id,
                    ]);
                    /* Existencia ID */
                    userFind_1.userFind.findUser(this.query[0]);
                    /* Name Image PATH */
                    this.nameImgDB = getDataDB_1.getDataDB.init(this.query[0], 3, 9);
                    this.imgExistente = this.pathServer(tipo, this.nameImgDB);
                    this.deleteImgServer(this.imgExistente);
                    /* Guardar Nombre Imagen En La DB*/
                    yield mysql2_1.pool.query('UPDATE doctors SET img = ? WHERE id = ?', [
                        nombreArchivo,
                        id,
                    ]);
                    return true;
                    break;
                case 'hospitals':
                    this.query = yield mysql2_1.pool.query('SELECT img FROM hospitals WHERE id = ?', [id]);
                    /* Existencia ID */
                    userFind_1.userFind.findUser(this.query[0]);
                    /* Name Image PATH */
                    this.nameImgDB = getDataDB_1.getDataDB.init(this.query[0], 3, 9);
                    this.imgExistente = this.pathServer(tipo, this.nameImgDB);
                    this.deleteImgServer(this.imgExistente);
                    /* Guardar Nombre Imagen En La DB*/
                    yield mysql2_1.pool.query('UPDATE hospitals SET img = ? WHERE id = ?', [
                        nombreArchivo,
                        id,
                    ]);
                    return true;
                    break;
                default:
                    throw new Error(`User's Type No Exist!`);
                    break;
            }
        });
    }
    /* Nombre De La Imagen Previa Del Doctor En La DB, Solo El Nombre, Despues Se Construye El PATH Para Eliminarla Del Servidor, Por Que En Teoria Y Existe En La Base De Datos*/
    pathServer(tipo, nameImgDB) {
        return path_1.default.resolve(__dirname, `../../../assets/uploads/img/${tipo}/${nameImgDB}`);
    }
    /* Eliminar Nombre Archivo De Servidor */
    deleteImgServer(imgExistente) {
        /* Si No Existe Nada, No Pasa Nada (:D) */
        if (fs_1.default.existsSync(imgExistente)) {
            return fs_1.default.unlinkSync(imgExistente);
        }
    }
}
exports.unaSolaImgDB = new UnaSolaImgDB();
