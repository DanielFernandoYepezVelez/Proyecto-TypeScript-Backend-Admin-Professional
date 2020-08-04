"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataDB = void 0;
class GetDataDB {
    constructor() {
        this.cadena = '';
        this.finalCadena = 0;
        this.result = '';
    }
    init(query, finalString, inicioString) {
        this.cadena = JSON.stringify(query);
        this.finalCadena = this.cadena.length - finalString;
        this.result = this.cadena.substring(inicioString, this.finalCadena);
        return this.result;
    }
}
exports.getDataDB = new GetDataDB();
