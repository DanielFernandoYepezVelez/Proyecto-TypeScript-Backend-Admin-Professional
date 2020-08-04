"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRoutes = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
/* Middlewares */
const DoctorValidation_1 = require("./../utils/middlewares/DoctorValidation");
/* Controllers */
const doctor_controller_1 = require("../controllers/doctor.controller");
class DoctorRoutes {
    constructor(router) {
        this.router = router;
        this.router.get('/doctors', passport_1.default.authenticate('jwt', { session: false }), doctor_controller_1.doctorController.getDoctors);
        this.router.post('/newDoctor', passport_1.default.authenticate('jwt', { session: false }), [DoctorValidation_1.doctorValidation.createDoctorValidation], doctor_controller_1.doctorController.createDoctor);
        this.router.put('/updateDoctor/:doctor_id', passport_1.default.authenticate('jwt', { session: false }), 
        // [doctorValidation.updateDoctorValidation],
        doctor_controller_1.doctorController.updateDoctor);
        this.router.delete('/deleteDoctor/:doctor_id', passport_1.default.authenticate('jwt', { session: false }), doctor_controller_1.doctorController.deleteDoctor);
    }
}
exports.doctorRoutes = new DoctorRoutes(express_1.Router()).router;
