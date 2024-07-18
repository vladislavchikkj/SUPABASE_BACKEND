"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const folderRoutes_1 = __importDefault(require("./routes/folderRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const port = 3001;
let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use('/api/folders', folderRoutes_1.default);
app.use('/api/files', fileRoutes_1.default);
app.get('/api/', (req, res) => {
    res.send('default root path');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
