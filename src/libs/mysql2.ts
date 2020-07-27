import { createPool, Pool } from 'mysql2/promise';

class Mysql2 {
  connectDatabase(): any {
    const pool: Pool = createPool({
      host: process.env.HOST_DATABSE,
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

export const pool = new Mysql2().connectDatabase();
