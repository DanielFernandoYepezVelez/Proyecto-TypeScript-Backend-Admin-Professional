import { Request, Response } from 'express';

/* Librerias */
import { pool } from '../libs/mysql2';

class UploadController {
  async fileUpload(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        msg: 'File Uploaded Successfully',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }
}

export const uploadController = new UploadController();
