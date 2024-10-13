"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRoute = void 0;
const express_1 = require("express");
const contoller_1 = require("../contoller");
exports.tokenRoute = (0, express_1.Router)();
exports.tokenRoute.post("/", contoller_1.generateToken);
