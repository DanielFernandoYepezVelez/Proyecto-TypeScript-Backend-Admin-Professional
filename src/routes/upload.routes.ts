import { Router } from 'express';
import passport from 'passport';

/* Middlewares */
// import { hospitalValidation } from '../utils/middlewares/HospitalValidation';

/* Controllers */
import { uploadController } from '../controllers/upload.controller';

class UploadRoutes {
  constructor(public router: Router) {
    this.router.put(
      '/upload/:tipo/:id',
      passport.authenticate('jwt', { session: false }),
      uploadController.fileUpload
    );
    this.router.get('/upload/:tipo/:image', uploadController.returnImage);
  }
}

export const uploadRoutes = new UploadRoutes(Router()).router;
