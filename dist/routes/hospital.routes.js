"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hospitalRoutes = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
/* Middlewares */
const HospitalValidation_1 = require("../utils/middlewares/HospitalValidation");
/* Controllers */
const hospital_controller_1 = require("../controllers/hospital.controller");
class HospitalRoutes {
    constructor(router) {
        this.router = router;
        this.router.get('/hospitals', passport_1.default.authenticate('jwt', { session: false }), hospital_controller_1.hospitalController.getHopitals);
        this.router.post('/newHospital', passport_1.default.authenticate('jwt', { session: false }), [HospitalValidation_1.hospitalValidation.createHospitalValidation], hospital_controller_1.hospitalController.createHospital);
        this.router.put('/updateHospital/:hospital_id', passport_1.default.authenticate('jwt', { session: false }), [HospitalValidation_1.hospitalValidation.updateHospitalValidation], hospital_controller_1.hospitalController.updateHospital);
        this.router.delete('/deleteHospital/:hospital_id', passport_1.default.authenticate('jwt', { session: false }), hospital_controller_1.hospitalController.deleteHospital);
    }
}
exports.hospitalRoutes = new HospitalRoutes(express_1.Router()).router;
