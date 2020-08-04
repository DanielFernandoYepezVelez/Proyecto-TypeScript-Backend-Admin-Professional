"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailFind = void 0;
class EmailFind {
    userEmailFind(query) {
        /* Validando Un Email Ya Existente En La DB*/
        if (!(JSON.stringify(query) === '[]')) {
            throw new Error('Email Already Exist!').message;
        }
    }
}
exports.emailFind = new EmailFind();
