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
class PdfService {
    setBasicMetadata(file, file_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (0, uuid_1.generateUuid)();
                const { data, error } = yield supabase_1.default
                    .getClient()
                    .from('file_data')
                    .insert([
                    {
                        id,
                        file_id: file_id,
                        title: file.title || null,
                        authors: file.authors || null,
                        publication_date: file.publication_date || null,
                        number_of_pages: file.number_of_pages || null,
                        file_size: file.file_size || null,
                        upload_date: new Date().toISOString(),
                    },
                ]);
                if (error) {
                    throw error;
                }
                return { success: true, data };
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
exports.default = PdfService;
