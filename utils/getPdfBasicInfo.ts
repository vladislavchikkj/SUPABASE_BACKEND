import pdf from "pdf-parse";

export async function getPdfBasicInfo(dataBuffer: Buffer): Promise<string> {
    try {
        let data = await pdf(dataBuffer);
        return data.text;
    } catch (error) {
        throw error;
    }
}