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
exports.uploadController = void 0;
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/* Librerias */
const mysql2_1 = require("../libs/mysql2");
/* Helpers */
const unaSolaImgDB_1 = require("../utils/helpers/img/unaSolaImgDB");
const userFind_1 = require("../utils/helpers/user/userFind");
class UploadController {
    fileUpload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, id } = req.params;
            const tiposValidos = ['users', 'doctors', 'hospitals'];
            try {
                if (!tiposValidos.includes(tipo)) {
                    throw new Error('No es un usuario, doctor u hospital').message;
                }
                if (!req.files || Object.keys(req.files).length === 0) {
                    throw new Error('No Hay Ningun Archivo').message;
                }
                /* Validar ID Antes De Mover Imagenes Al Servidor */
                const query_u = mysql2_1.pool.query('SELECT id FROM users WHERE id = ?', [id]);
                const query_d = mysql2_1.pool.query('SELECT id FROM doctors WHERE id = ?', [id]);
                const query_h = mysql2_1.pool.query('SELECT id FROM hospitals WHERE id = ?', [id]);
                const [user, doctor, hospital] = yield Promise.all([
                    query_u,
                    query_d,
                    query_h,
                ]);
                if (tipo === 'users') {
                    userFind_1.userFind.findUser(user[0]);
                }
                else if (tipo === 'doctors') {
                    userFind_1.userFind.findUser(doctor[0]);
                }
                else if (tipo === 'hospitals') {
                    userFind_1.userFind.findUser(hospital[0]);
                }
                /* Procesar la imagen */
                const file = req.files.imagen;
                const name = file.name.split('.');
                const ext = name[name.length - 1];
                /* Validar Extensión */
                const extValidas = ['png', 'jpg', 'jpge', 'gif'];
                if (!extValidas.includes(ext)) {
                    throw new Error('Extension No Valida').message;
                }
                /* Generar el nombre del archivo de la imagen */
                let nombreArchivo = `${uuid_1.v4()}.${ext}`;
                /* Path Para Guardar La Imagen En El Servidor */
                const pathFile = path_1.default.resolve(__dirname, `../assets/uploads/img/${tipo}/${nombreArchivo}`);
                /* Ojo Con Esto Por Que Es Un CallBack No Se Aceptan Promesas(OJO!!) */
                yield file.mv(pathFile);
                /* Actualización En La Base De Datos */
                const ok = yield unaSolaImgDB_1.unaSolaImgDB.saveImage(tipo, id, nombreArchivo);
                return res.json({
                    ok,
                    mgs: 'File Uploaded Successfully',
                });
            }
            catch (e) {
                return res.status(400).json({
                    ok: false,
                    error: e,
                    mgs: 'File NOT Uploaded Successfully',
                });
            }
        });
    }
    returnImage(req, res) {
        const { tipo, image } = req.params;
        const pathImage = path_1.default.join(__dirname, `../assets/uploads/img/${tipo}/${image}`);
        if (fs_1.default.existsSync(pathImage)) {
            res.sendFile(pathImage);
        }
        else {
            const pathImage = path_1.default.join(__dirname, `../assets/uploads/img/notfound.png`);
            res.sendFile(pathImage);
        }
    }
}
exports.uploadController = new UploadController();
