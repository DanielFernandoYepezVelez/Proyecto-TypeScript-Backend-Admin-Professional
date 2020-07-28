import { Pool } from 'mysql2/promise';

class EmailFind {
  userEmailFind(query: Pool) {
    /* Validando Un Email Ya Existente En La DB*/
    if (!(JSON.stringify(query) === '[]')) {
      throw new Error('Email Already Exist!').message;
    }
  }
}

export const emailFind = new EmailFind();
