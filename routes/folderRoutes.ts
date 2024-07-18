import express from "express";

import folderController from "@controllers/folder/folderController";

const router = express.Router();

router.get('/', folderController.getRootFolder);
router.get('/folder', folderController.getFolder);


export default router;