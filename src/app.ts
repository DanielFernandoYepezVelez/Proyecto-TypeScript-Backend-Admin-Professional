import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

class App {
  /* Initializations */
  constructor(public app: Application) {}

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {}

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
