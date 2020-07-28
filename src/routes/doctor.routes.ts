import { Router } from 'express';
// import passport from 'passport';

/* Middlewares */
// import { userValidation } from '../utils/middlewares/UserValidation';

/* Controllers */
import { doctorController } from '../controllers/doctor.controller';

class DoctorRoutes {
  constructor(public router: Router) {
    this.router.get(
      '/doctors',
      // passport.authenticate('jwt', { session: false }),
      doctorController.getDoctors
    );
    this.router.post(
      '/newDoctor',
      // [userValidation.createUserValidation],
      doctorController.createDoctor
    );
    this.router.put(
      '/updateDoctor/:doctor_id',
      // passport.authenticate('jwt', { session: false }),
      // [userValidation.updateUserValidation],
      doctorController.updateDoctor
    );
    this.router.delete(
      '/deleteDoctor/:doctor_id',
      // passport.authenticate('jwt', { session: false }),
      doctorController.deleteDoctor
    );
  }
}

export const doctorRoutes = new DoctorRoutes(Router()).router;
