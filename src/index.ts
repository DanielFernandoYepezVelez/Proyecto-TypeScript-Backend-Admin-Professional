import { app } from './app';

class Main {
  constructor() {
    app.middlewares();
    app.routes();
    app.server();
  }
}

new Main();
