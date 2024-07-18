import {Request, Response} from "express";
import folderStorageService from "../../services/folder/folderService";
import {handleError} from "../../utils/erroHandler";


const folderService = new folderStorageService();

class FolderController {
    async getRootFolder(req: Request, res: Response) {
        try {
            const rootFolder = await folderService.listRootFoldersAndFiles();
            res.status(200).json({success: true, data: rootFolder});
        } catch (error) {
            const {statusCode, message} = handleError(error);
            res.status(statusCode).json({message});
        }
    }

    async getFolder(req: Request<{}, {}, {}, { folderName: string }>, res: Response) {
        try {
            const {folderName} = req.query;
            const folder = await folderService.listFoldersAndFiles(folderName);
            res.status(200).json(folder);
        } catch (error) {
            const {statusCode, message} = handleError(error);
            res.status(statusCode).json({message});
        }
    }
}

export default new FolderController();