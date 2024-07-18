import {Request, Response} from "express";
import FileDBService from "./fileDBService";
import FileStorageService from "./fileStorageService";
import {
    isErrorMoveResponse,
    isErrorResponse,
    isErrorUploadResponse
} from "../../utils/erroHandler";
import {generateUuid} from "../../utils/uuid";
import {SuccessStorageResponse} from "../../types/types";


class FileService {
    private fileStorageService: FileStorageService;
    private fileDBService: FileDBService;

    constructor() {
        this.fileStorageService = new FileStorageService();
        this.fileDBService = new FileDBService();
    }

    async uploadFile(req: Request, res: Response) {
        try {
            const id = generateUuid();
            const file_name = req.file ? req.file.originalname : req.body.file_name;
            const user_id = req.body.user_id;
            const file = {
                file_name: file_name || 'empty_name',
                file_url: file_name ,
                id,
                user_id,
            }
            const dbUpload = await this.fileDBService.uploadFile(file);
            if (!dbUpload.success) {
                return false;
            }

            // TODO add transaction implementation here to rollback if one of the operations fails
            const uploadResult = await this.fileStorageService.uploadFile(req, res, id);

            return !isErrorUploadResponse(uploadResult);

        } catch (error) {
            return false;
        }
    }

    async moveFile(fromPath: string, toPath: string, file_id: string) {
        try {
            const moveResult = await this.fileStorageService.moveFile(fromPath, toPath);
            if (isErrorMoveResponse(moveResult)) {
                return false;
            }

            const dbMove = await this.fileDBService.moveFile(toPath, file_id);
            return dbMove.success;

        } catch (error) {
            return false;
        }
    }

    async copyFile(fromPath: string, toPath: string, file_id: string) {
        try {
            const copyResult = await this.fileStorageService.copyFile(fromPath, toPath);
            if (isErrorResponse(copyResult)) {
                return false;
            }
            const dbCopy = await this.fileDBService.copyFile(toPath, file_id);
            return dbCopy.success;

        } catch (error) {
            return false;
        }
    }

    async deleteFile(fromPath: string | string[], file_id: string) {
        try {
            const pathToDelete = Array.isArray(fromPath) ? fromPath : [fromPath];
            const copyResult = await this.fileStorageService.deleteFile(pathToDelete);
            if (isErrorResponse(copyResult)) {
                return false;
            }

            const dbDelete = await this.fileDBService.deleteFile(file_id);
            return dbDelete.success;

        } catch (error) {
            return false;
        }
    }

    async downloadFile(file_id: string) {
        try {
            const dbDownload = await this.fileDBService.getFile(file_id);
            if (dbDownload.success && dbDownload.data) {
                const file = this.fileStorageService.downloadFile(dbDownload.data.file_url);

                if (isErrorResponse(file)) {
                    return false;
                }
                return file as SuccessStorageResponse<{ data: Blob }>
            } else {
                return false;
            }

        } catch (error) {
            return false;
        }
    }

    async getFileInfo(file_id: string) {
        try {
            const dbDownload = await this.fileDBService.getFile(file_id);
            return dbDownload;
        } catch (error) {
            return false;
        }
    }
}

export default FileService;