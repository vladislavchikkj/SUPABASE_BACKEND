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
const supabase_1 = __importDefault(require("../db/supabase"));
const getPDFMetadataAI_1 = require("../../utils/ai/getPDFMetadataAI");
const pdfData_1 = __importDefault(require("../pdf/pdfData"));
class FileStorageService {
    constructor(bucketName = 'ai-pdf-bucket') {
        this.bucketName = bucketName;
        this.pdfService = new pdfData_1.default();
    }
    uploadFile(req, res, file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.file) {
                    const fileBuffer = req.file.buffer;
                    const fileName = req.file.originalname;
                    // TODO ADD additional logic extraction of pdf metadata
                    const { data, error } = yield supabase_1.default.getClient().storage
                        .from(this.bucketName)
                        .upload(fileName, fileBuffer, {
                        cacheControl: '3600',
                        upsert: false,
                    });
                    if (error) {
                        throw error;
                    }
                    const pdfData = yield (0, getPDFMetadataAI_1.getPDFMetadataAI)(fileBuffer);
                    const { data: fileData, error: fileError } = yield this.pdfService.setBasicMetadata(mapAIBasicToBasicPDFInformation(pdfData), file_id);
                    if (fileError) {
                        throw fileError;
                    }
                    return { data, error, pdfData };
                }
                else {
                    throw new Error('No file provided');
                }
            }
            catch (error) {
                const errorResponse = {
                    statusCode: '500',
                    error: 'error', // TODO Change to error code
                    message: 'Unexpected error occurred during file upload'
                };
                return errorResponse;
            }
        });
    }
    moveFile(fromPath, toPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase_1.default.getClient()
                    .storage
                    .from(this.bucketName)
                    .move(fromPath, toPath);
                if (error) {
                    throw error;
                }
                return { data, error };
            }
            catch (error) {
                const errorResponse = {
                    statusCode: '500',
                    error: 'error', // TODO Change to error code
                    message: 'Unexpected error occurred during file move'
                };
                return errorResponse;
            }
        });
    }
    copyFile(fromPath, toPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase_1.default.getClient()
                    .storage
                    .from(this.bucketName)
                    .copy(fromPath, toPath);
                if (error) {
                    throw error;
                }
                return { data, error };
            }
            catch (error) {
                const errorResponse = {
                    statusCode: '500',
                    error: 'error', // TODO Change to error code
                    message: 'Unexpected error occurred during file move'
                };
                return errorResponse;
            }
        });
    }
    deleteFile(fromPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase_1.default.getClient()
                    .storage
                    .from(this.bucketName)
                    .remove(fromPath);
                if (error) {
                    throw error;
                }
                return { data, error };
            }
            catch (error) {
                const errorResponse = {
                    statusCode: '500',
                    error: 'error', // TODO Change to error code
                    message: 'Unexpected error occurred during file move'
                };
                return errorResponse;
            }
        });
    }
    downloadFile(fromPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase_1.default.getClient()
                    .storage
                    .from(this.bucketName)
                    .download(fromPath);
                if (error) {
                    throw error;
                }
                return { data, error };
            }
            catch (error) {
                const errorResponse = {
                    statusCode: '500',
                    error: 'error', // TODO Change to error code
                    message: 'Unexpected error occurred during file download'
                };
                return errorResponse;
            }
        });
    }
}
exports.default = FileStorageService;
function mapAIBasicToBasicPDFInformation(aiBasicInfo) {
    return {
        title: aiBasicInfo.Title,
        authors: aiBasicInfo.Authors,
        publication_date: aiBasicInfo['Publication Date'],
        number_of_pages: aiBasicInfo['Number Of Pages'],
        upload_date: aiBasicInfo['Upload Date'],
        file_size: aiBasicInfo['File Size']
    };
}
