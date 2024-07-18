"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileController_1 = __importDefault(require("../controllers/file/fileController"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.get('/:fileId', fileController_1.default.getFileInfo);
router.get('/:fileId/download', fileController_1.default.downloadFile);
router.post('/', upload.single('file'), fileController_1.default.uploadFile);
router.delete('/:fileId', fileController_1.default.deleteFile);
router.put('/:fileId/move', fileController_1.default.moveFile);
router.post('/:fileId/copy', fileController_1.default.copyFile);
exports.default = router;
