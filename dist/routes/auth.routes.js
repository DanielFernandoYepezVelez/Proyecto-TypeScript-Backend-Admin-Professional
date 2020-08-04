"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
/* Middlewares */
const UserValidation_1 = require("../utils/middlewares/UserValidation");
/* Controller */
const auth_controller_1 = require("../controllers/auth.controller");
class AuthRoutes {
    constructor(router) {
        this.router = router;
        this.router.post('/login', [UserValidation_1.userValidation.loginUserValidation], auth_controller_1.authController.login);
        this.router.post('/login/loginGoogle', [UserValidation_1.userValidation.loginUserGoogleValidation], auth_controller_1.authController.loginGoogle);
        this.router.get('/login/renewToken', passport_1.default.authenticate('jwt', { session: false }), auth_controller_1.authController.renovarToken);
    }
}
exports.authRoutes = new AuthRoutes(express_1.Router()).router;
