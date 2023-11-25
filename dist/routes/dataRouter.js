"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DataController = require('../controllers/dataController');
const router = express_1.default.Router();
router.get('/', DataController.getAllProjects);
router.post('/createproject', DataController.createProject);
router.get('/:id', DataController.getAllTickets);
router.get('/tickets/getlast', DataController.getLastTicket);
router.put('/updateticket', DataController.updateTicket);
router.post('/createticket', DataController.createTicket);
router.post('/deleteticket', DataController.deleteTicket);
module.exports = router;
