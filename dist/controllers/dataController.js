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
Object.defineProperty(exports, "__esModule", { value: true });
const { Project, Ticket } = require('../models');
class DataController {
    createProject(req, res, _) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = req.body;
            const project = yield Project.create({ name, description });
            return res.json(project);
        });
    }
    getAllProjects(_, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield Project.findAll();
                return res.json(projects);
            }
            catch (error) {
                const { status, message } = error;
                return next(res.status(status).json(message));
            }
        });
    }
    createTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { creator, description, issue, problem, projectid, severity, solution, status } = req.body;
                const ticketData = { description, issue, problem, projectid, severity, solution, status };
                const ticketUser = {
                    created: new Date().getTime(),
                    touched: new Date().getTime(),
                    creator,
                    toucher: creator
                };
                const ticket = yield Ticket.create(Object.assign(Object.assign({}, ticketData), ticketUser));
                return res.json(ticket);
            }
            catch (error) {
                const { status, message } = error;
                return next(res.status(status).json(message));
            }
        });
    }
    updateTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ticket = req.body;
                const { id } = ticket;
                yield Ticket.update(ticket, { where: { id } });
                return res.json(ticket);
            }
            catch (error) {
                const { status, message } = error;
                return next(res.status(status).json(message));
            }
        });
    }
    deleteTicket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.body.id);
                yield Ticket.destroy({ where: { id } });
                return res.json(id);
            }
            catch (error) {
                const { status, message } = error;
                return next(res.status(status).json(message));
            }
        });
    }
    getAllTickets(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const tickets = yield Ticket.findAll({
                    where: { projectid: id }
                });
                return res.json(tickets);
            }
            catch (error) {
                const { status, message } = error;
                return next(res.status(status).json(message));
            }
        });
    }
    getLastTicket(_, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tickets = yield Ticket.findAll();
                const lastId = Object.keys(tickets)
                    .map((el) => tickets[el])
                    .sort((a, b) => (b.id > a.id ? 1 : b.id < a.id ? -1 : 0))[0].id;
                return res.json(lastId);
            }
            catch (error) {
                const { status, message } = error;
                return next(res.status(status).json(message));
            }
        });
    }
}
module.exports = new DataController();
