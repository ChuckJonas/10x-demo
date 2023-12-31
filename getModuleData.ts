import { FetchDataParams, fetchData } from "./api";

type GetModuleDataParams = Omit<FetchDataParams, "max">;

const getModuleData = async (params: GetModuleDataParams & { offset: number }): Promise<any[]> => {
  const MAX_RECORDS = 1000;
  let allRecords: any[] = [];

  // Helper function
  const fetchAndAggregateData = async () => {
    try {
      const response = await fetchData({ ...params, offset, max: MAX_RECORDS });

      // Update offset for next iteration
      offset = response.next_offset;

      // Aggregate all records
      allRecords = [...allRecords, ...response.records];

      // Check if there's more data to fetch
      if (response.next_offset >= 0) {
        // Recursive call to handle pagination
        await fetchAndAggregateData();
      }
    } catch (error) {
      throw new Error(`Failed to fetch data at offset: ${offset}`);
    }
  };

  await fetchAndAggregateData();

  return allRecords;
};

export default getModuleData;
