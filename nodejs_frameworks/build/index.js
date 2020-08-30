"use strict";
// const express = require('express');
// const app = express();
// const PORT = 8000;
// app.get('/', (req,res) => res.send('Express + TypeScript Server'));
// app.listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
// });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// rest of the code remains same
const app = express_1.default();
const PORT = 8000;
app.get("/", (req, res) => res.send("Express + TypeScript Server. Prout."));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
