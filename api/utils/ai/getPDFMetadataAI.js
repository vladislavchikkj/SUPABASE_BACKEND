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
exports.getPDFMetadataAI = getPDFMetadataAI;
const gemini_1 = __importDefault(require("../../services/ai/gemini"));
const createPrompt_1 = require("./createPrompt");
const getPdfBasicInfo_1 = require("../getPdfBasicInfo");
const aiTemplates_1 = require("./aiTemplates");
// TODO Replace with the correct types
function getPDFMetadataAI(dataBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pdfText = yield (0, getPdfBasicInfo_1.getPdfBasicInfo)(dataBuffer);
            let data = yield gemini_1.default.getModel().generateContent((0, createPrompt_1.createPrompt)(aiTemplates_1.metadataDefaultTemplate, pdfText));
            const response = data.response.text();
            const cleanedJsonString = response.trim().replace(/^```json/, '').replace(/```$/, '').trim();
            const parsedDocument = JSON.parse(cleanedJsonString);
            return parsedDocument["Basic Information"]; // TMP SOLUTION JUST TO CHECK
        }
        catch (error) {
            throw error;
        }
    });
}
