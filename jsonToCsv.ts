// Importing required libraries
import { json2csv } from "json-2-csv";

/**
 * Converts JSON to CSV.
 *
 * @param {Object[]} jsonData Array of JSON objects to be converted
 * @returns {Promise<String>} A promise that resolves with a string representation of the CSV data
 */
const convertToCsv = async (jsonData: any) => {
  try {
    const csvData = await json2csv(jsonData);
    return csvData;
  } catch (error: any) {
    console.error(`Error converting JSON to CSV: ${error.message}`);
    throw error;
  }
};

export { convertToCsv };
