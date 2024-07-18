import supabase from "../db/supabase";
import {Request, Response} from "express";
import {
    AIBasicPDFInformation, BasicPDFInformation,
    ErrorStorageUploadResponse,
    StorageApiUploadResponse,
    SuccessStorageMoveResponse,
    SuccessStorageResponse,
    SuccessStorageUploadResponse
} from "../../types/types";
import {getPDFMetadataAI} from "../../utils/ai/getPDFMetadataAI";
import PdfService from "../pdf/pdfData";

export default class FileStorageService {
    private bucketName: string;
    private pdfService: PdfService;

    constructor(bucketName: string = 'ai-pdf-bucket') {
        this.bucketName = bucketName;
        this.pdfService = new PdfService();
    }



    async uploadFile(req: Request, res: Response, file_id: string): Promise<StorageApiUploadResponse> {
        try {
            if (req.file) {
                const fileBuffer = req.file.buffer;
                const fileName = req.file.originalname;
                // TODO ADD additional logic extraction of pdf metadata
                const {data, error} = await supabase.getClient().storage
                    .from(this.bucketName)
                    .upload(fileName, fileBuffer, {
                        cacheControl: '3600',
                        upsert: false,
                    });


                if (error) {
                    throw error;
                }

                const pdfData = await getPDFMetadataAI(fileBuffer);
                const {data: fileData, error: fileError} = await this.pdfService.setBasicMetadata(mapAIBasicToBasicPDFInformation(pdfData),file_id);
                if (fileError) {
                    throw fileError;
                }
                return {data, error, pdfData} as SuccessStorageUploadResponse;
            } else {
                throw new Error('No file provided');
            }
        } catch (error) {
            const errorResponse: ErrorStorageUploadResponse = {
                statusCode: '500',
                error: 'error', // TODO Change to error code
                message: 'Unexpected error occurred during file upload'
            };
            return errorResponse;
        }
    }

    async moveFile(fromPath: string, toPath: string) {
        try {
            const {data, error}= await supabase.getClient()
                .storage
                .from(this.bucketName)
                .move(fromPath, toPath)

            if (error) {
                throw error;
            }

            return {data, error} as SuccessStorageMoveResponse;

        } catch (error) {
            const errorResponse: ErrorStorageUploadResponse = {
                statusCode: '500',
                error: 'error', // TODO Change to error code
                message: 'Unexpected error occurred during file move'
            };
            return errorResponse;
        }
    }

    async copyFile(fromPath: string, toPath: string) {
        try {
            const {data, error}= await supabase.getClient()
                .storage
                .from(this.bucketName)
                .copy(fromPath, toPath)

            if (error) {
                throw error;
            }

            return {data, error} as SuccessStorageResponse<{path: string}>;

        } catch (error) {
            const errorResponse: ErrorStorageUploadResponse = {
                statusCode: '500',
                error: 'error', // TODO Change to error code
                message: 'Unexpected error occurred during file move'
            };
            return errorResponse;
        }
    }

    async deleteFile(fromPath: string[]) {
        try {
            const {data, error}= await supabase.getClient()
                .storage
                .from(this.bucketName)
                .remove(fromPath)

            if (error) {
                throw error;
            }

            return {data, error} as unknown as SuccessStorageResponse<{data: []}>;

        } catch (error) {
            const errorResponse: ErrorStorageUploadResponse = {
                statusCode: '500',
                error: 'error', // TODO Change to error code
                message: 'Unexpected error occurred during file move'
            };
            return errorResponse;
        }
    }

    async downloadFile(fromPath: string) {
        try {
            const { data, error } = await supabase.getClient()
                .storage
                .from(this.bucketName)
                .download(fromPath)
            if (error) {
                throw error;
            }
            return {data, error} as unknown as SuccessStorageResponse<{data: Blob}>;
        } catch (error) {
            const errorResponse: ErrorStorageUploadResponse = {
                statusCode: '500',
                error: 'error', // TODO Change to error code
                message: 'Unexpected error occurred during file download'
            };
            return errorResponse;
        }
    }

}

function mapAIBasicToBasicPDFInformation(aiBasicInfo: AIBasicPDFInformation): BasicPDFInformation {
    return {
        title: aiBasicInfo.Title,
        authors: aiBasicInfo.Authors,
        publication_date: aiBasicInfo['Publication Date'],
        number_of_pages: aiBasicInfo['Number Of Pages'],
        upload_date: aiBasicInfo['Upload Date'],
        file_size: aiBasicInfo['File Size']
    };
}