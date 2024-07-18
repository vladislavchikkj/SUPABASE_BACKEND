"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_js_1 = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_KEY } = dotenv_1.default.configDotenv().parsed;
class SupabaseClient {
    constructor() {
        if (!SupabaseClient.instance) {
            this.client = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
            SupabaseClient.instance = this;
        }
        return SupabaseClient.instance;
    }
    getClient() {
        return this.client;
    }
}
const instance = new SupabaseClient();
Object.freeze(instance);
exports.default = instance;
