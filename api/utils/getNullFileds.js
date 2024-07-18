"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNullFields = getNullFields;
function getNullFields(json, prefix = '') {
    let nullFields = [];
    for (const key in json) {
        const value = json[key];
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (value === null || value === "<null>") {
            nullFields.push(fullKey);
        }
        else if (typeof value === 'object' && value !== null) {
            nullFields = nullFields.concat(getNullFields(value, fullKey));
        }
    }
    return nullFields;
}
