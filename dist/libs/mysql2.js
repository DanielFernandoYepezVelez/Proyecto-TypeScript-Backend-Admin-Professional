"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
class Mysql2 {
    connectDatabase() {
        const pool = promise_1.createPool({
            host: process.env.HOST_DATABASE,
            user: process.env.USER_DATABASE,
            password: process.env.PASSWORD_DATABASE,
            database: process.env.NAME_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        if (!pool) {
            console.log('>>> Database Is NOT Connected');
            return;
        }
        console.log('>>> Database Is Connected');
        return pool;
    }
}
exports.pool = new Mysql2().connectDatabase();
