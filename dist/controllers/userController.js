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
const models_1 = require("../models");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const createToken = ({ id, email, admin = false }) => {
    return jsonwebtoken.sign({ id, email, admin }, process.env.SECRET_KEY, { expiresIn: '24h' });
};
class UserController {
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = req.body;
            if (!email || !password || !name)
                return next(res.status(400).json('Not enough data'));
            const gotUser = yield models_1.User.findOne({ where: { email } });
            if (gotUser)
                return next(res.status(403).json('Email already in use'));
            const hashPassword = yield bcrypt.hash(password, 5);
            const user = yield models_1.User.create({ email, password: hashPassword, name });
            const token = createToken(user);
            return res.json({ user, token });
        });
    }
    // working
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield models_1.User.findOne({ where: { email } });
            if (!user)
                return next(res.status(400).json('User does not exists'));
            let pwdCheck = bcrypt.compareSync(password, user.password);
            if (!pwdCheck)
                return next(res.status(403).json('Wrong password'));
            const token = createToken(user);
            return res.json({ user, token });
        });
    }
    // working
    auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            const headerToken = authorization && authorization.split(' ')[1];
            if (!headerToken)
                return next(res.status(401).json('User not authorized (token probably expired)'));
            const findUser = (id) => __awaiter(this, void 0, void 0, function* () {
                yield models_1.User.findOne({ where: { id } })
                    .then((response) => response.dataValues)
                    .then((user) => {
                    delete user.password;
                    const token = createToken(user);
                    return res.json({ user, token });
                });
            });
            jsonwebtoken.verify(headerToken, process.env.SECRET_KEY, (error, user) => {
                if (error) {
                    const { status = 401, message } = error;
                    return next(res.status(status).json(message));
                }
                if (!user.id)
                    return next(res.status(400).json('No user ID'));
                findUser(user.id);
            });
        });
    }
    // working
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.User.findAll();
                return res.json(users);
            }
            catch (error) {
                const { status = 500, message } = error;
                return next(res.status(status).json(message));
            }
        });
    }
    // working
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, id } = req.body;
                yield models_1.User.update({ name }, { where: { id } });
                return res.json('User updated');
            }
            catch (error) {
                const { status = 403, message } = error;
                return next(res.status(status).json(message));
            }
        });
    }
}
module.exports = new UserController();
