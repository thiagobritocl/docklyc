/**
 * Data API helper - Placeholder for external API calls
 * Replace with your own API integrations as needed
 */

export type DataApiCallOptions = {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  formData?: Record<string, unknown>;
};

export async function callDataApi(
  apiId: string,
  options: DataApiCallOptions = {}
): Promise<unknown> {
  console.warn(`[DataApi] callDataApi("${apiId}") is not configured. Implement your own API integration.`);
  return {};
}
