// Add the axios import at the top
import axios from "axios";
import { process } from "node";

// Define TypeScript type for AuthParams
type AuthParams = {
  host: string;
  username: string;
  password: string;
};

// Define TypeScript type for FetchDataParams
export type FetchDataParams = {
  host: string;
  module: string;
  offset: number;
  max: number;
  token: string;
};

export type FetchResponse = {
  next_offset: number;
  records: any[];
};

const apiVersion = process.env.API_VERSION || '10';
const API_URL = `${process.env.HOST}/rest/v${apiVersion}`;

// Then the functions auth and fetchData as before...

// Define the auth function to get the access token from SugarCRM REST API v10
export const auth = async ({ host, username, password }: AuthParams) => {
  try {
    // Prepare the request config for getting the auth token
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Make the request to get the auth token
    const response = await axios.post(
      `${API_URL}/oauth2/token`,
      {
        grant_type: "password",
        client_id: "sugar", // this could be different depending on your setup
        client_secret: "", // not needed by default in Sugar CRM
        username: username,
        password: password,
      },
      config
    );

    // If we couldn't get the auth token, throw an error
    if (!response.data.access_token) {
      throw new Error("Authentication failed");
    }

    // Return the access token
    return response.data.access_token;
  } catch (error: any) {
    // Handle network errors
    console.error(`Failed to authenticate with SugarCRM API: ${error.message}`);
    process.exit(1);
  }
};

// Define the fetchData function which will use the Axios library to make HTTP requests to the SugarCRM REST API v10
export const fetchData = async ({
  host,
  module,
  offset,
  max,
  token,
}: FetchDataParams): Promise<FetchResponse> => {
  const uri = `${API_URL}/${module}?offset=${offset}&max_num=${max}`;
  try {
    // Config for fetching data
    const config = {
      headers: {
        "Content-Type": "application/json",
        "OAuth-Token": token,
      },
    };

    // Make the request to fetch the data
    const response = await axios.get(uri, config);

    // Return the response data
    return response.data;
  } catch (error: any) {
    // Handle network errors

    console.error(`Failed to fetch data from ${uri}: ${error.message}`);
    throw error;
  }
};
