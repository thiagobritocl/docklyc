/**
 * Storage helpers - Placeholder for file storage
 * Replace with your own S3/storage implementation as needed
 */

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  console.warn(`[Storage] storagePut("${relKey}") - Storage not configured. Implement your own S3 or storage solution.`);
  return { key: relKey, url: "" };
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  console.warn(`[Storage] storageGet("${relKey}") - Storage not configured. Implement your own S3 or storage solution.`);
  return { key: relKey, url: "" };
}
