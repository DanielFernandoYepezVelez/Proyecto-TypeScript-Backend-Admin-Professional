import { Pool } from 'mysql2/promise';

class UserFind {
  findUser(query: Pool) {
    /* Validando Que El Usuario Exista En La DB */
    if (JSON.stringify(query) === '[]') {
      throw new Error('User Not Exist!').message;
    }
  }

  messageUserPassword(match: boolean) {
    if (!match) {
      throw new Error('Password No Válido').message;
    }
  }
}

export const userFind = new UserFind();
