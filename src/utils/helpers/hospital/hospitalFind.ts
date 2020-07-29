import { Pool } from 'mysql2/promise';

class HospitalFind {
  findHospital(query: Pool) {
    /* Validando Que El Hospital Exista En La DB */
    if (JSON.stringify(query) === '[]') {
      throw new Error('Hospital Not Exist!').message;
    }
  }
}

export const hospitalFind = new HospitalFind();
