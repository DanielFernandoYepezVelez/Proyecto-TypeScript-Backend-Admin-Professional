"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRoutes = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
/* Controllers */
const search_controller_1 = require("../controllers/search.controller");
class SearchRoutes {
    constructor(router) {
        this.router = router;
        this.router.get('/todo/:termino', passport_1.default.authenticate('jwt', { session: false }), search_controller_1.searchController.getTodo);
        this.router.get('/specific/:table/:termino', passport_1.default.authenticate('jwt', { session: false }), search_controller_1.searchController.getTable);
    }
}
exports.searchRoutes = new SearchRoutes(express_1.Router()).router;
