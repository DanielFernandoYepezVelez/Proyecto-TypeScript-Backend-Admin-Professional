"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcrypt = void 0;
const bcryptjs_1 = require("bcryptjs");
class Bcrypt {
    hashPassword(Userpassword) {
        const salt = bcryptjs_1.genSaltSync(10);
        return bcryptjs_1.hashSync(Userpassword, salt);
    }
    comparePassword(Userpassword, passwordDB) {
        return bcryptjs_1.compareSync(Userpassword, passwordDB);
    }
}
exports.bcrypt = new Bcrypt();
