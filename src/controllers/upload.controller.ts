import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

/* Librerias */
import { pool } from '../libs/mysql2';

/* Helpers */
import { unaSolaImgDB } from '../utils/helpers/img/unaSolaImgDB';
import { userFind } from '../utils/helpers/user/userFind';

class UploadController {
  async fileUpload(req: Request, res: Response): Promise<any> {
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
      const query_u = pool.query('SELECT id FROM users WHERE id = ?', [id]);
      const query_d = pool.query('SELECT id FROM doctors WHERE id = ?', [id]);
      const query_h = pool.query('SELECT id FROM hospitals WHERE id = ?', [id]);

      const [user, doctor, hospital] = await Promise.all([
        query_u,
        query_d,
        query_h,
      ]);

      userFind.findUser(user[0]);
      userFind.findUser(doctor[0]);
      userFind.findUser(hospital[0]);

      /* Procesar la imagen */
      const file: any = req.files.imagen;
      const name: string[] = file.name.split('.');
      const ext: string = name[name.length - 1];

      /* Validar Extensión */
      const extValidas = ['png', 'jpg', 'jpge', 'gif'];
      if (!extValidas.includes(ext)) {
        throw new Error('Extension No Valida').message;
      }

      /* Generar el nombre del archivo de la imagen */
      let nombreArchivo = `${uuidv4()}.${ext}`;

      /* Path Para Guardar La Imagen En El Servidor */
      const pathFile = path.resolve(
        __dirname,
        `../assets/uploads/img/${tipo}/${nombreArchivo}`
      );

      /* Ojo Con Esto Por Que Es Un CallBack No Se Aceptan Promesas(OJO!!) */
      await file.mv(pathFile);

      /* Actualización En La Base De Datos */
      const ok = await unaSolaImgDB.saveImage(tipo, id, nombreArchivo);

      return res.json({
        ok,
        mgs: 'File Uploaded Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
        mgs: 'File NOT Uploaded Successfully',
      });
    }
  }

  returnImage(req: Request, res: Response) {
    const { tipo, image } = req.params;

    const pathImage = path.join(
      __dirname,
      `../assets/uploads/img/${tipo}/${image}`
    );

    if (fs.existsSync(pathImage)) {
      res.sendFile(pathImage);
    } else {
      const pathImage = path.join(
        __dirname,
        `../assets/uploads/img/notfound.png`
      );

      res.sendFile(pathImage);
    }
  }
}

export const uploadController = new UploadController();
