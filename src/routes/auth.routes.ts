import { Router } from 'express';

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
  }
}

export const authRoutes = new AuthRoutes(Router()).router;
