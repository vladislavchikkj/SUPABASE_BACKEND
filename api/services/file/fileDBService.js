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
const uuid_1 = require("../../utils/uuid");
const supabase_1 = __importDefault(require("../db/supabase"));
class FileDBService {
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase_1.default
                    .getClient()
                    .from('files')
                    .insert([
                    {
                        id: file.id,
                        file_name: file.file_name,
                        file_url: file.file_url,
                        folder_id: file.folder_id || null,
                        user_id: file.user_id,
                        created_at: new Date().toISOString(),
                    },
                ]);
                if (error) {
                    console.log(error);
                    throw error;
                }
                return { success: true, data };
            }
            catch (error) {
                console.log(error);
                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        });
    }
    moveFile(toPath, file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = yield supabase_1.default
                    .getClient()
                    .from('files')
                    .update({ file_url: toPath })
                    .eq('id', file_id);
                if (error) {
                    throw error;
                }
                return { success: true };
            }
            catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        });
    }
    copyFile(toPath, file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase_1.default
                    .getClient()
                    .from('files')
                    .select('*')
                    .eq('id', file_id);
                if (error) {
                    throw error;
                }
                if (data.length !== 0) {
                    const file = data[0];
                    const updatedFile = Object.assign(Object.assign({}, file), { file_url: toPath, id: (0, uuid_1.generateUuid)() });
                    const uploadResult = yield this.uploadFile(updatedFile);
                    if (uploadResult.success) {
                        return { success: true, data };
                    }
                    return { success: false, error: uploadResult.error };
                }
                else {
                    return { success: false, error: 'No file found' };
                }
            }
            catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        });
    }
    deleteFile(file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield supabase_1.default
                    .getClient()
                    .from('files')
                    .delete()
                    .eq('id', file_id);
                if (response.error) {
                    throw new Error('Error deleting file');
                }
                return { success: true };
            }
            catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        });
    }
    getFile(file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase_1.default
                    .getClient()
                    .from('files')
                    .select('*, file_data(*)')
                    .eq('id', file_id);
                if (error) {
                    throw error;
                }
                return { success: true, data: data[0] };
            }
            catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error',
                };
            }
        });
    }
}
exports.default = FileDBService;
