"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.justifyTextHandler = exports.justifyText = void 0;
//Exporting the controllers
var text_justify_controller_1 = require("./text-justify-controller");
Object.defineProperty(exports, "justifyText", { enumerable: true, get: function () { return text_justify_controller_1.justifyText; } });
Object.defineProperty(exports, "justifyTextHandler", { enumerable: true, get: function () { return text_justify_controller_1.justifyTextHandler; } });
var generate_token_controller_1 = require("./generate-token-controller");
Object.defineProperty(exports, "generateToken", { enumerable: true, get: function () { return generate_token_controller_1.generateToken; } });
