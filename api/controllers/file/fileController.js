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
const fileService_1 = __importDefault(require("../../services/file/fileService"));
const erroHandler_1 = require("../../utils/erroHandler");
const fileService = new fileService_1.default();
class FileController {
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield fileService.uploadFile(req, res);
                if (result) {
                    res
                        .status(200)
                        .json({ success: true, message: 'File uploaded successfully' });
                }
                else {
                    res.status(404).json({ message: 'Error uploading file' });
                }
            }
            catch (error) {
                console.log(error);
                const { statusCode, message } = (0, erroHandler_1.handleError)(error);
                res.status(statusCode).json({ message });
            }
        });
    }
    moveFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fromPath, toPath } = req.query;
                const { fileId } = req.params;
                const result = yield fileService.moveFile(fromPath, toPath, fileId);
                if (result) {
                    res
                        .status(200)
                        .json({ success: true, message: 'File moved successfully' });
                }
                else {
                    res.status(404).json({ message: 'Error moving file' });
                }
            }
            catch (error) {
                const { statusCode, message } = (0, erroHandler_1.handleError)(error);
                res.status(statusCode).json({ message });
            }
        });
    }
    copyFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fromPath, toPath } = req.query;
                const { fileId } = req.params;
                const result = yield fileService.copyFile(fromPath, toPath, fileId);
                if (result) {
                    res
                        .status(200)
                        .json({ success: true, message: 'File copy successfully' });
                }
                else {
                    res.status(404).json({ message: 'Error copying file' });
                }
            }
            catch (error) {
                const { statusCode, message } = (0, erroHandler_1.handleError)(error);
                res.status(statusCode).json({ message });
            }
        });
    }
    deleteFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fromPath } = req.query;
                const { fileId } = req.params;
                const result = yield fileService.deleteFile(fromPath, fileId);
                if (result) {
                    res
                        .status(200)
                        .json({ success: true, message: 'File delete successfully' });
                }
                else {
                    res.status(404).json({ message: 'Error delete file' });
                }
            }
            catch (error) {
                const { statusCode, message } = (0, erroHandler_1.handleError)(error);
                res.status(statusCode).json({ message });
            }
        });
    }
    downloadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fileId } = req.params;
                const result = yield fileService.downloadFile(fileId);
                if (result) {
                    res.status(200).send(result.data);
                }
                else {
                    res.status(404).json({ message: 'Error downloading file' });
                }
            }
            catch (error) {
                const { statusCode, message } = (0, erroHandler_1.handleError)(error);
                res.status(statusCode).json({ message });
            }
        });
    }
    getFileInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fileId } = req.params;
                const result = yield fileService.getFileInfo(fileId);
                if (result) {
                    res.status(200).json(result.data);
                }
                else {
                    res.status(404).json({ message: 'Error getting file info' });
                }
            }
            catch (error) {
                const { statusCode, message } = (0, erroHandler_1.handleError)(error);
                res.status(statusCode).json({ message });
            }
        });
    }
}
exports.default = new FileController();
