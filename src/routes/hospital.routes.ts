import { Router } from 'express';
import passport from 'passport';

/* Middlewares */
import { hospitalValidation } from '../utils/middlewares/HospitalValidation';

/* Controllers */
import { hospitalController } from '../controllers/hospital.controller';

class HospitalRoutes {
  constructor(public router: Router) {
    this.router.get(
      '/hospitals',
      passport.authenticate('jwt', { session: false }),
      hospitalController.getHopitals
    );
    this.router.post(
      '/newHospital',
      passport.authenticate('jwt', { session: false }),
      [hospitalValidation.createHospitalValidation],
      hospitalController.createHospital
    );
    this.router.put(
      '/updateHospital/:hospital_id',
      passport.authenticate('jwt', { session: false }),
      [hospitalValidation.updateHospitalValidation],
      hospitalController.updateHospital
    );
    this.router.delete(
      '/deleteHospital/:hospital_id',
      passport.authenticate('jwt', { session: false }),
      hospitalController.deleteHospital
    );
  }
}

export const hospitalRoutes = new HospitalRoutes(Router()).router;
