import supabase from "../db/supabase";

export default class FolderService {
    private readonly subfolders: string[];
    private readonly files: string[];
    constructor(private bucketName: string = 'ai-pdf-bucket') {
        // this.name = name;
        this.subfolders = [];
        this.files = [];
    }

    async listRootFoldersAndFiles() {
        return await this.listFoldersAndFiles('');
    }

    async listFoldersAndFiles(folderPath: string) {
        try {
            const { data, error } = await supabase.getClient().storage
                .from(this.bucketName) // TODO: Switch  with correct way of passing bucket name e.g. arg in fn  or class property
                .list(folderPath, { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });
            if (error) {
                throw error;
            }

            const subfolders = [];
            const files = [];
            for (const item of data) {
                if (item.metadata  === null) {
                    subfolders.push(item.name);
                } else {
                    if (item.metadata.size > 0) {
                        files.push(item.name);
                    }
                }
            }

            return { subfolders, files };
        } catch (error) {
            throw error;
        }
    }
}
