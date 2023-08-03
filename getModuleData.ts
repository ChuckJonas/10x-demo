import { FetchDataParams, fetchData } from "./api";

type GetModuleDataParams = Omit<FetchDataParams, "offset" | "max">;

const getModuleData = async (params: GetModuleDataParams): Promise<any[]> => {
  const MAX_RECORDS = 1000;
  let offset = 0;
  let allRecords: any[] = [];

  // Get total count of records
  const { data: { record_count } } = await axios.get(`/rest/v10/${params.module}/count`);
  console.log(`Pulling data from ${params.module}.  Total Records: ${record_count}.  Starting from offset ${offset}`);

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
