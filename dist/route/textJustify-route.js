"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyRoute = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const contoller_1 = require("../contoller");
// Exporting justify text route
exports.justifyRoute = (0, express_1.Router)();
// Defining justify text route
exports.justifyRoute.post("/", middleware_1.verifyToken, middleware_1.checkRateLimit, contoller_1.justifyTextHandler);
