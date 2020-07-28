import 'dotenv/config';

import express, { Application } from 'express';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';

/* Routes */
import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.routes';

/* Librerias */
import { passportJwt } from './libs/passport-jwt';

class App {
  /* Initializations */
  constructor(public app: Application) {}

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    passport.use(passportJwt.nuevaStrategia());
  }

  routes() {
    this.app.use('/api', userRoutes);
    this.app.use('/api', authRoutes);
  }

  async server(): Promise<void> {
    try {
      await this.app.listen(process.env.PORT);
      console.log(`Server On Port ${process.env.PORT}`);
    } catch (e) {
      console.log(e);
    }
  }
}

export const app = new App(express());
