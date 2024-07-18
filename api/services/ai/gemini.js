"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const generative_ai_1 = require("@google/generative-ai");
const { GEMINI_API_KEY_SECRET } = dotenv_1.default.configDotenv().parsed;
class GeminiClient {
    constructor() {
        if (!GeminiClient.instance) {
            const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY_SECRET);
            this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            GeminiClient.instance = this;
        }
        return GeminiClient.instance;
    }
    getModel() {
        return this.model;
    }
}
const instance = new GeminiClient();
Object.freeze(instance);
exports.default = instance;
