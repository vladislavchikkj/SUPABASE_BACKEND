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
const fileDBService_1 = __importDefault(require("./fileDBService"));
const fileStorageService_1 = __importDefault(require("./fileStorageService"));
const erroHandler_1 = require("../../utils/erroHandler");
const uuid_1 = require("../../utils/uuid");
class FileService {
    constructor() {
        this.fileStorageService = new fileStorageService_1.default();
        this.fileDBService = new fileDBService_1.default();
    }
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, uuid_1.generateUuid)();
                const file_name = req.file ? req.file.originalname : req.body.file_name;
                const user_id = req.body.user_id;
                const file = {
                    file_name: file_name || 'empty_name',
                    file_url: file_name,
                    id,
                    user_id,
                };
                const dbUpload = yield this.fileDBService.uploadFile(file);
                if (!dbUpload.success) {
                    return false;
                }
                // TODO add transaction implementation here to rollback if one of the operations fails
                const uploadResult = yield this.fileStorageService.uploadFile(req, res, id);
                return !(0, erroHandler_1.isErrorUploadResponse)(uploadResult);
            }
            catch (error) {
                return false;
            }
        });
    }
    moveFile(fromPath, toPath, file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const moveResult = yield this.fileStorageService.moveFile(fromPath, toPath);
                if ((0, erroHandler_1.isErrorMoveResponse)(moveResult)) {
                    return false;
                }
                const dbMove = yield this.fileDBService.moveFile(toPath, file_id);
                return dbMove.success;
            }
            catch (error) {
                return false;
            }
        });
    }
    copyFile(fromPath, toPath, file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const copyResult = yield this.fileStorageService.copyFile(fromPath, toPath);
                if ((0, erroHandler_1.isErrorResponse)(copyResult)) {
                    return false;
                }
                const dbCopy = yield this.fileDBService.copyFile(toPath, file_id);
                return dbCopy.success;
            }
            catch (error) {
                return false;
            }
        });
    }
    deleteFile(fromPath, file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pathToDelete = Array.isArray(fromPath) ? fromPath : [fromPath];
                const copyResult = yield this.fileStorageService.deleteFile(pathToDelete);
                if ((0, erroHandler_1.isErrorResponse)(copyResult)) {
                    return false;
                }
                const dbDelete = yield this.fileDBService.deleteFile(file_id);
                return dbDelete.success;
            }
            catch (error) {
                return false;
            }
        });
    }
    downloadFile(file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbDownload = yield this.fileDBService.getFile(file_id);
                if (dbDownload.success && dbDownload.data) {
                    const file = this.fileStorageService.downloadFile(dbDownload.data.file_url);
                    if ((0, erroHandler_1.isErrorResponse)(file)) {
                        return false;
                    }
                    return file;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
        });
    }
    getFileInfo(file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbDownload = yield this.fileDBService.getFile(file_id);
                return dbDownload;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.default = FileService;
