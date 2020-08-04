"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
class UserSchema {
    createUserSchema() {
        return joi_1.default.object({
            name: joi_1.default.string().min(3).max(20).required(),
            password: joi_1.default.string().min(4).max(70).required(),
            email: joi_1.default.string()
                .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            })
                .required(),
            image: joi_1.default.string(),
        });
    }
    loginUserSchema() {
        return joi_1.default.object({
            email: joi_1.default.string()
                .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            })
                .required(),
            password: joi_1.default.string().min(4).max(70).required(),
        });
    }
    loginUserGoogleSchema() {
        return joi_1.default.object({
            google_token: joi_1.default.string().required(),
        });
    }
    updateUserSchema() {
        return joi_1.default.object({
            name: joi_1.default.string().min(3).max(20).required(),
            email: joi_1.default.string()
                .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            })
                .required(),
            role: joi_1.default.string().required(),
        });
    }
}
exports.userSchema = new UserSchema();
