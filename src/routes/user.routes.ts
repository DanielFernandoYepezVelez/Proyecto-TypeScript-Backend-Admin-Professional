import { Router } from 'express';
import passport from 'passport';

/* Middlewares */
import { userValidation } from '../utils/middlewares/UserValidation';

/* Controllers */
import { userController } from '../controllers/user.controller';

class UserRoutes {
  constructor(public router: Router) {
    this.router.get(
      '/users',
      passport.authenticate('jwt', { session: false }),
      userController.getUsers
    );
    this.router.post(
      '/newUser',
      passport.authenticate('jwt', { session: false }),
      [userValidation.createUserValidation],
      userController.createUser
    );
    this.router.put(
      '/updateUser/:user_id',
      passport.authenticate('jwt', { session: false }),
      [userValidation.updateUserValidation],
      userController.updateUser
    );
    this.router.delete(
      '/deleteUser/:user_id',
      passport.authenticate('jwt', { session: false }),
      userController.deleteUser
    );
  }
}

export const userRoutes = new UserRoutes(Router()).router;
