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
class FolderService {
    constructor(bucketName = 'ai-pdf-bucket') {
        this.bucketName = bucketName;
        // this.name = name;
        this.subfolders = [];
        this.files = [];
    }
    listRootFoldersAndFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.listFoldersAndFiles('');
        });
    }
    listFoldersAndFiles(folderPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase_1.default.getClient().storage
                    .from(this.bucketName) // TODO: Switch  with correct way of passing bucket name e.g. arg in fn  or class property
                    .list(folderPath, { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });
                if (error) {
                    throw error;
                }
                const subfolders = [];
                const files = [];
                for (const item of data) {
                    if (item.metadata === null) {
                        subfolders.push(item.name);
                    }
                    else {
                        if (item.metadata.size > 0) {
                            files.push(item.name);
                        }
                    }
                }
                return { subfolders, files };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = FolderService;
