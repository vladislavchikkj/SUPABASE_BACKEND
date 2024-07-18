"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const folderController_1 = __importDefault(require("../controllers/folder/folderController"));
const router = express_1.default.Router();
router.get('/', folderController_1.default.getRootFolder);
router.get('/folder', folderController_1.default.getFolder);
exports.default = router;
