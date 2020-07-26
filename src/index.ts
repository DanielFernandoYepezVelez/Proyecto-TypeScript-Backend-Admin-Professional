import { app } from './app';

class Main {
  constructor() {
    app.middlewares();
    app.server();
  }
}

new Main();
