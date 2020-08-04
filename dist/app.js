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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
/* import path from 'path'; */
const express_fileupload_1 = __importDefault(require("express-fileupload"));
/* Librerias */
const passport_jwt_1 = require("./libs/passport-jwt");
/* Routes */
const user_routes_1 = require("./routes/user.routes");
const auth_routes_1 = require("./routes/auth.routes");
const doctor_routes_1 = require("./routes/doctor.routes");
const search_routes_1 = require("./routes/search.routes");
const upload_routes_1 = require("./routes/upload.routes");
const hospital_routes_1 = require("./routes/hospital.routes");
class App {
    /* Initializations */
    constructor(app) {
        this.app = app;
    }
    middlewares() {
        this.app.use(cors_1.default());
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_fileupload_1.default());
        passport_1.default.use(passport_jwt_1.passportJwt.nuevaStrategia());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api', auth_routes_1.authRoutes);
        this.app.use('/api', user_routes_1.userRoutes);
        this.app.use('/api', doctor_routes_1.doctorRoutes);
        this.app.use('/api', search_routes_1.searchRoutes);
        this.app.use('/api', upload_routes_1.uploadRoutes);
        this.app.use('/api', hospital_routes_1.hospitalRoutes);
    }
    /* staticFile() {
      this.app.use(express.static(path.join(__dirname, './public/')));
    } */
    server() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.app.listen(process.env.PORT);
                console.log(`Server On Port ${process.env.PORT}`);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.app = new App(express_1.default());
