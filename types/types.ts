export interface EnvConfig {
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
    GEMINI_API_KEY_SECRET: string;
}

// Тип для папки
export type Folder = {
    id: string;
    name: string;
    parent_folder_id: string | null;
    user_id: string | null;
    created_at: string | null;
};

// Тип для вставки новой папки
export type FolderInsert = {
    id?: string; // UUID генерируется автоматически, если не предоставлен
    folder_name: string;
    parent_id?: string | null;
    user_id?: string | null;
    is_root?: boolean;
    created_at?: string | null;
};

// Тип для обновления папки
export type FolderUpdate = {
    id?: string;
    name?: string;
    parent_folder_id?: string | null;
    user_id?: string | null;
    created_at?: string | null;
};

// Тип для файла
export type FileDB = {
    id: string;
    file_name: string;
    file_url: string;
    folder_id: string | null;
    user_id: string | null;
    created_at: string | null;
};

// Тип для вставки нового файла
export type FileInsert = {
    id?: string; // UUID генерируется автоматически, если не предоставлен
    file_name: string;
    file_url: string;
    folder_id?: string | null;
    user_id?: string | null;
    created_at?: string | null;
};

// Тип для обновления файла
export type FileUpdate = {
    id?: string;
    file_name?: string;
    file_url?: string;
    folder_id?: string | null;
    user_id?: string | null;
    created_at?: string | null;
};

export interface FileDataResponse {
    path: string;
    fullPath: string;
}

export interface ErrorDetails {
    statusCode: number;
    message: string;
}

// Интерфейс для ответа
export interface UploadResponse {
    data: FileDataResponse | null;
    error: ErrorDetails | null;
    message: string | null;
}

export interface SuccessStorageUploadResponse {
    data: FileDataResponse;
    error: null;
    pdfData: AIBasicPDFInformation;
}

export interface ErrorStorageUploadResponse {
    statusCode: string;
    error: string;
    message: string;
}

export type StorageApiUploadResponse = SuccessStorageUploadResponse | ErrorStorageUploadResponse;


export  interface FileMoveParams {
    fromPath: string;
    toPath: string;
    folderId: string;
}
export interface SuccessStorageMoveResponse {
    data: { message: string };
    error: null;
}

export interface ErrorStorageMoveResponse {
    statusCode: string;
    error: string;
    message: string;
}

export type StorageApiMoveResponse = SuccessStorageMoveResponse | ErrorStorageMoveResponse;

export interface SuccessStorageResponseData {
    message: string;
}

export interface SuccessStorageResponse<T = SuccessStorageResponseData> {
    data: T;
    error: null;
}

export interface ErrorStorageResponse<T> {
    error: T | string;
    message: string;
}


export type StorageApiResponse<T,N> = SuccessStorageResponse<T> | ErrorStorageResponse<N>;

export type JSONStructure = {
    [key: string]: any;
};

export interface JobData<T> {
    data: T;
}

export interface FileParsingJobData {
    fileId: number;
    filePath: string;
}



export interface AIBasicPDFInformation {
    Title: string;
    Authors: string | null;
    "Publication Date": string | null;
    "Number Of Pages": number | null;
    "Upload Date": string | null;
    "File Size": string | null;
}

export interface BasicPDFInformation {
    title: string;
    authors: string | null;
    publication_date: string | null;
    number_of_pages: number | null;
    upload_date: string | null;
    file_size: string | null;
}
