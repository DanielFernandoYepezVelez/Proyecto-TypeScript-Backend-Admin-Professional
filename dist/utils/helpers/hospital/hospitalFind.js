"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hospitalFind = void 0;
class HospitalFind {
    findHospital(query) {
        /* Validando Que El Hospital Exista En La DB */
        if (JSON.stringify(query) === '[]') {
            throw new Error('Hospital Not Exist!').message;
        }
    }
}
exports.hospitalFind = new HospitalFind();
