"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoutes = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
/* Middlewares */
// import { hospitalValidation } from '../utils/middlewares/HospitalValidation';
/* Controllers */
const upload_controller_1 = require("../controllers/upload.controller");
class UploadRoutes {
    constructor(router) {
        this.router = router;
        this.router.put('/upload/:tipo/:id', passport_1.default.authenticate('jwt', { session: false }), upload_controller_1.uploadController.fileUpload);
        this.router.get('/upload/:tipo/:image', upload_controller_1.uploadController.returnImage);
    }
}
exports.uploadRoutes = new UploadRoutes(express_1.Router()).router;
