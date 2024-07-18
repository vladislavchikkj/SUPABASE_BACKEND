import express from "express";

import fileController from "../controllers/file/fileController";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/:fileId', fileController.getFileInfo);
router.get('/:fileId/download', fileController.downloadFile);
router.post('/', upload.single('file'), fileController.uploadFile);
router.delete('/:fileId', fileController.deleteFile);
router.put('/:fileId/move', fileController.moveFile);
router.post('/:fileId/copy', fileController.copyFile);


export default router;