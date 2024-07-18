"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.AppError = void 0;
exports.isSuccessUploadResponse = isSuccessUploadResponse;
exports.isErrorUploadResponse = isErrorUploadResponse;
exports.isSuccessMoveResponse = isSuccessMoveResponse;
exports.isErrorMoveResponse = isErrorMoveResponse;
exports.isSuccessStorageResponse = isSuccessStorageResponse;
exports.isErrorStorageResponse = isErrorStorageResponse;
exports.isErrorResponse = isErrorResponse;
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const handleError = (error) => {
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;
    if (error instanceof AppError) {
        errorMessage = error.message;
        statusCode = error.statusCode;
    }
    else if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { statusCode, message: errorMessage };
};
exports.handleError = handleError;
function isSuccessUploadResponse(response) {
    return response.error === null;
}
function isErrorUploadResponse(response) {
    return response.statusCode !== undefined;
}
function isSuccessMoveResponse(response) {
    return response.error === null;
}
function isErrorMoveResponse(response) {
    return response.statusCode !== undefined;
}
function isSuccessStorageResponse(response) {
    return response.error === null;
}
function isErrorStorageResponse(response) {
    return response.statusCode !== undefined;
}
function isErrorResponse(response) {
    return response.statusCode !== undefined;
}
