// Importing required libraries and functions
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { auth } from "./api";
import { convertToCsv } from "./jsonToCsv";
import { writeFile } from "fs/promises";
import getModuleData from "./getModuleData";

const dotenv = require("dotenv");
dotenv.config();

// Parsing command line arguments
const argv = yargs(hideBin(process.argv)).argv;

// Destructuring required args from argv
const { module: moduleName, output, offset, max } = argv as any;

const run = async () => {
  try {
    const username = process.env.USERNAME as string;
    const password = process.env.PASSWORD as string;
    const host = process.env.HOST as string;
    // Authenticate user and get token
    const token = await auth({ host, username, password });

    // Fetch data from SugarCRM API
    const data = await getModuleData({ host, module: moduleName, token });

    // Convert fetched data to CSV
    const csvData = await convertToCsv(data);

    // Write CSV data to file
    await writeFile(output, csvData);

    console.log(`Data has been written successfully to ${output}`);
  } catch (error: any) {
    console.error(
      `Error while fetching data from SugarCRM API: ${error.message}`
    );
    process.exit(1);
  }
};

// Initiating the run
run();
