"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrompt = createPrompt;
function createPrompt(prompt, text) {
    return `${prompt}${text}`;
}
