"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
class Main {
    constructor() {
        app_1.app.middlewares();
        app_1.app.routes();
        /* app.staticFile(); */
        app_1.app.server();
    }
}
new Main();
