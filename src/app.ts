import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

/* Routes */
import { userRoutes } from './routes/user.routes';

class App {
  /* Initializations */
  constructor(public app: Application) {}

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use('/api', userRoutes);
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
