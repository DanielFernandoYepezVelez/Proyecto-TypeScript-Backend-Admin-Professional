import { Request, Response } from 'express';

class DoctorController {
  async getDoctors(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        doctors: '',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async createDoctor(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        doctors: '',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async updateDoctor(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        doctors: '',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<Response<JSON>> {
    try {
      return res.json({
        ok: true,
        doctors: '',
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }
  }
}

export const doctorController = new DoctorController();
