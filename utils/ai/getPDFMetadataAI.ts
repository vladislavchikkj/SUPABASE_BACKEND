import gemini from "../../services/ai/gemini";
import {createPrompt} from "./createPrompt";
import {getPdfBasicInfo} from "../getPdfBasicInfo";
import {metadataDefaultTemplate} from "./aiTemplates";
import {AIBasicPDFInformation} from "../../types/types";

// TODO Replace with the correct types
export async function getPDFMetadataAI(dataBuffer: Buffer): Promise<AIBasicPDFInformation> {
    try {
        const pdfText = await getPdfBasicInfo(dataBuffer);
        let data = await gemini.getModel().generateContent(createPrompt(metadataDefaultTemplate, pdfText));

        const response = data.response.text();
        const cleanedJsonString = response.trim().replace(/^```json/, '').replace(/```$/, '').trim();
        const parsedDocument = JSON.parse(cleanedJsonString);

        return parsedDocument["Basic Information"]; // TMP SOLUTION JUST TO CHECK
    } catch (error) {
        throw error;
    }
}