"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
class DoctorSchema {
    createDoctorSchema() {
        return joi_1.default.object({
            name: joi_1.default.string().min(3).max(20).required(),
            hospital_id: joi_1.default.string().min(1).required(),
            image: joi_1.default.string(),
        });
    }
    updateDoctorSchema() {
        return joi_1.default.object({
            name: joi_1.default.string().min(3).max(20).required(),
        });
    }
}
exports.doctorSchema = new DoctorSchema();
