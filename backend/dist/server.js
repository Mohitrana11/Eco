"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
app.get("/", (req, res) => {
    res.send("send data to me");
    console.log("This is running!");
});
app.listen(PORT, () => {
    console.log(`server running on port http://localhost:${PORT}`);
});
