import { Router } from 'express';
import passport from 'passport';

/* Middlewares */
import { userValidation } from '../utils/middlewares/UserValidation';

/* Controller */
import { authController } from '../controllers/auth.controller';

class AuthRoutes {
  constructor(public router: Router) {
    this.router.post(
      '/login',
      [userValidation.loginUserValidation],
      authController.login
    );
    this.router.post(
      '/login/loginGoogle',
      [userValidation.loginUserGoogleValidation],
      authController.loginGoogle
    );
    this.router.get(
      '/login/renewToken',
      passport.authenticate('jwt', { session: false }),
      authController.renovarToken
    );
  }
}

export const authRoutes = new AuthRoutes(Router()).router;
