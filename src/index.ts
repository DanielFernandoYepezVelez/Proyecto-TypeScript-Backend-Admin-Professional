import { app } from './app';

class Main {
  constructor() {
    app.middlewares();
    app.routes();
    /* app.staticFile(); */
    app.server();
  }
}

new Main();
