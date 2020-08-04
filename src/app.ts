import 'dotenv/config';

import express, { Application } from 'express';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
/* import path from 'path'; */
import expressFileUpload from 'express-fileupload';

/* Librerias */
import { passportJwt } from './libs/passport-jwt';

/* Routes */
import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.routes';
import { doctorRoutes } from './routes/doctor.routes';
import { searchRoutes } from './routes/search.routes';
import { uploadRoutes } from './routes/upload.routes';
import { hospitalRoutes } from './routes/hospital.routes';

class App {
  /* Initializations */
  constructor(public app: Application) {}

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(expressFileUpload());
    passport.use(passportJwt.nuevaStrategia());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use('/api', authRoutes);
    this.app.use('/api', userRoutes);
    this.app.use('/api', doctorRoutes);
    this.app.use('/api', searchRoutes);
    this.app.use('/api', uploadRoutes);
    this.app.use('/api', hospitalRoutes);
  }

  /* staticFile() {
    this.app.use(express.static(path.join(__dirname, './public/')));
  } */

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
