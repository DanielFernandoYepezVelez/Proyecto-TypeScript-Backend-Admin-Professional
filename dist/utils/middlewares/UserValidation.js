"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const User_1 = require("../schemasJoi/User");
class UserValidation {
    createUserValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield User_1.userSchema.createUserSchema().validate(req.body);
            if (!(error === undefined)) {
                return res.status(400).json({
                    ok: false,
                    error: error === null || error === void 0 ? void 0 : error.details[0].message,
                });
            }
            return next();
        });
    }
    loginUserValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield User_1.userSchema.loginUserSchema().validate(req.body);
            if (!(error === undefined)) {
                return res.status(400).json({
                    ok: false,
                    error: error === null || error === void 0 ? void 0 : error.details[0].message,
                });
            }
            return next();
        });
    }
    loginUserGoogleValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield User_1.userSchema
                .loginUserGoogleSchema()
                .validate(req.body);
            if (!(error === undefined)) {
                return res.status(400).json({
                    ok: false,
                    error: error === null || error === void 0 ? void 0 : error.details[0].message,
                });
            }
            return next();
        });
    }
    updateUserValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield User_1.userSchema.updateUserSchema().validate(req.body);
            if (!(error === undefined)) {
                return res.status(400).json({
                    ok: false,
                    error: error === null || error === void 0 ? void 0 : error.details[0].message,
                });
            }
            return next();
        });
    }
}
exports.userValidation = new UserValidation();
