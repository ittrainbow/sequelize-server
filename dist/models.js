"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.Ticket = exports.User = void 0;
const sequelize = require('./db');
const { DataTypes } = require('sequelize');
exports.User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true }
});
exports.Ticket = sequelize.define('ticket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    creator: { type: DataTypes.STRING },
    created: { type: DataTypes.BIGINT },
    updater: { type: DataTypes.STRING },
    updated: { type: DataTypes.BIGINT },
    projectid: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING(2000) },
    issue: { type: DataTypes.STRING(2000) },
    problem: { type: DataTypes.STRING },
    severity: { type: DataTypes.STRING },
    solution: { type: DataTypes.STRING(2000) },
    status: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true }
});
exports.Project = sequelize.define('project', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    projectid: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true }
});
module.exports = {
    User: exports.User,
    Ticket: exports.Ticket,
    Project: exports.Project
};
