import { Router } from 'express';

/* Middlewares */
import { userValidation } from '../utils/middlewares/UserValidation';

/* Controllers */
import { userController } from '../controllers/user.controller';

class UserRoutes {
  constructor(public router: Router) {
    this.router.get('/users', userController.getUsers);
    this.router.post(
      '/newUser',
      [userValidation.createUserValidation],
      userController.createUser
    );
    this.router.put(
      '/updateUser/:user_id',
      [userValidation.updateUserValidation],
      userController.updateUser
    );
    this.router.delete('/deleteUser/:user_id', userController.deleteUser);
  }
}

export const userRoutes = new UserRoutes(Router()).router;
