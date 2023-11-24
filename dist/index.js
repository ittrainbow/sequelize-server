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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require('cors');
require('dotenv').config();
const { PORT } = process.env;
const sequelize = require('./db');
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        yield sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }
    catch (error) {
        if (error instanceof Error)
            console.error(error.message);
    }
});
start();
const models = require('./models');
const router = require('./routes');
app.use(cors());
app.use(express_1.default.json());
app.get('/', (req, res) => res.status(200).json({ message: 'app is up!' }));
app.use('/api', router);
