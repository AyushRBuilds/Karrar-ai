import { MOCK_ANALYSIS } from "./mockData";

/**
 * Simulates a backend API call to analyze a contract.
 * Later, this function can be replaced with an actual fetch/axios call.
 * 
 * @param {File} file The file to upload and analyze
 * @returns {Promise<Object>} The analysis result
 */
export async function analyzeContract(file) {
    // Simulate network delay
    return new Promise((resolve, reject) => {
        // Basic validation
        if (!file) {
            return reject(new Error("No file provided"));
        }

        setTimeout(() => {
            resolve({ ...MOCK_ANALYSIS, fileName: file.name });
        }, 500); // 500ms artificial delay
    });
}
