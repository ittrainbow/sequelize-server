"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRouter = require('./usersRouter');
const ticketsRouter = require('./ticketsRouter');
const projectsRouter = require('./projectsRouter');
const router = express_1.default.Router();
router.use('/users', usersRouter);
router.use('/tickets', ticketsRouter);
router.use('/projects', projectsRouter);
module.exports = router;
