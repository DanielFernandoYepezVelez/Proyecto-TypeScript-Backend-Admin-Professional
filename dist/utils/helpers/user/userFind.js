"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFind = void 0;
class UserFind {
    findUser(query) {
        /* Validando Que El ID Exista En La DB */
        if (JSON.stringify(query) === '[]') {
            throw new Error('ID Not Exist!').message;
        }
    }
    messageUserPassword(match) {
        if (!match) {
            throw new Error('Password No Válido').message;
        }
    }
}
exports.userFind = new UserFind();
