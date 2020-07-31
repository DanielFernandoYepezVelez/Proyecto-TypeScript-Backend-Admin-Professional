import fs from 'fs';
import path from 'path';

/* Librerias */
import { pool } from '../../../libs/mysql2';

/* Helpers */
import { userFind } from '../user/userFind';
import { getDataDB } from '../getDataDB';

class UnaSolaImgDB {
  nameImgDB = '';
  imgExistente = '';
  query: any[] = [];

  async saveImage(
    tipo: string,
    id: string,
    nombreArchivo: string
  ): Promise<any> {
    switch (tipo) {
      case 'users':
        this.query = await pool.query('SELECT img FROM users WHERE id = ?', [
          id,
        ]);

        /* Existencia ID */
        userFind.findUser(this.query[0]);

        /* Name Image PATH */
        this.nameImgDB = getDataDB.init(this.query[0], 3, 9);

        this.imgExistente = this.pathServer(tipo, this.nameImgDB);
        this.deleteImgServer(this.imgExistente);

        /* Guardar Nombre Imagen En La DB*/
        this.query = await pool.query('UPDATE users SET img = ? WHERE id = ?', [
          nombreArchivo,
          id,
        ]);

        return true;
        break;

      case 'doctors':
        this.query = await pool.query('SELECT img FROM doctors WHERE id = ?', [
          id,
        ]);

        /* Existencia ID */
        userFind.findUser(this.query[0]);

        /* Name Image PATH */
        this.nameImgDB = getDataDB.init(this.query[0], 3, 9);

        this.imgExistente = this.pathServer(tipo, this.nameImgDB);
        this.deleteImgServer(this.imgExistente);

        /* Guardar Nombre Imagen En La DB*/
        await pool.query('UPDATE doctors SET img = ? WHERE id = ?', [
          nombreArchivo,
          id,
        ]);

        return true;
        break;

      case 'hospitals':
        this.query = await pool.query(
          'SELECT img FROM hospitals WHERE id = ?',
          [id]
        );

        /* Existencia ID */
        userFind.findUser(this.query[0]);

        /* Name Image PATH */
        this.nameImgDB = getDataDB.init(this.query[0], 3, 9);

        this.imgExistente = this.pathServer(tipo, this.nameImgDB);
        this.deleteImgServer(this.imgExistente);

        /* Guardar Nombre Imagen En La DB*/
        await pool.query('UPDATE hospitals SET img = ? WHERE id = ?', [
          nombreArchivo,
          id,
        ]);

        return true;
        break;

      default:
        throw new Error(`User's Type No Exist!`);
        break;
    }
  }

  /* Nombre De La Imagen Previa Del Doctor En La DB, Solo El Nombre, Despues Se Construye El PATH Para Eliminarla Del Servidor, Por Que En Teoria Y Existe En La Base De Datos*/
  pathServer(tipo: string, nameImgDB: string) {
    return path.resolve(
      __dirname,
      `../../../assets/uploads/img/${tipo}/${nameImgDB}`
    );
  }

  /* Eliminar Nombre Archivo De Servidor */
  deleteImgServer(imgExistente: string) {
    /* Si No Existe Nada, No Pasa Nada (:D) */
    if (fs.existsSync(imgExistente)) {
      return fs.unlinkSync(imgExistente);
    }
  }
}

export const unaSolaImgDB = new UnaSolaImgDB();
