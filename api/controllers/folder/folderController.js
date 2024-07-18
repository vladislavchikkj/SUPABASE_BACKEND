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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const folderService_1 = __importDefault(require("../../services/folder/folderService"));
const erroHandler_1 = require("../../utils/erroHandler");
const folderService = new folderService_1.default();
class FolderController {
    getRootFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rootFolder = yield folderService.listRootFoldersAndFiles();
                res.status(200).json({ success: true, data: rootFolder });
            }
            catch (error) {
                const { statusCode, message } = (0, erroHandler_1.handleError)(error);
                res.status(statusCode).json({ message });
            }
        });
    }
    getFolder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { folderName } = req.query;
                const folder = yield folderService.listFoldersAndFiles(folderName);
                res.status(200).json(folder);
            }
            catch (error) {
                const { statusCode, message } = (0, erroHandler_1.handleError)(error);
                res.status(statusCode).json({ message });
            }
        });
    }
}
exports.default = new FolderController();
