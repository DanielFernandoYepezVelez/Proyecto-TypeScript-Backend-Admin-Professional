"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
/* Middlewares */
const UserValidation_1 = require("../utils/middlewares/UserValidation");
/* Controllers */
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor(router) {
        this.router = router;
        this.router.get('/users', passport_1.default.authenticate('jwt', { session: false }), user_controller_1.userController.getUsers);
        this.router.post('/newUser', 
        // passport.authenticate('jwt', { session: false }),
        [UserValidation_1.userValidation.createUserValidation], user_controller_1.userController.createUser);
        this.router.put('/updateUser/:user_id', passport_1.default.authenticate('jwt', { session: false }), [UserValidation_1.userValidation.updateUserValidation], user_controller_1.userController.updateUser);
        this.router.delete('/deleteUser/:user_id', passport_1.default.authenticate('jwt', { session: false }), user_controller_1.userController.deleteUser);
    }
}
exports.userRoutes = new UserRoutes(express_1.Router()).router;
