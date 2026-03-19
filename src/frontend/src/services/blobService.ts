import { loadConfig } from "../config";

let blobBase = "";
let blobOwner = "";
let blobProject = "";
let initialized = false;

export async function initBlobService(): Promise<void> {
  if (initialized) return;
  try {
    const config = await loadConfig();
    blobBase = config.storage_gateway_url;
    blobOwner = config.backend_canister_id;
    blobProject = config.project_id;
    initialized = true;
  } catch (e) {
    console.error("Failed to init blob service:", e);
  }
}

export function getBlobUrl(imageId: string | undefined): string {
  if (!imageId || !blobBase || !blobOwner) return "";
  if (imageId.startsWith("http")) return imageId;
  return `${blobBase}/v1/blob/?blob_hash=${encodeURIComponent(imageId)}&owner_id=${encodeURIComponent(blobOwner)}&project_id=${encodeURIComponent(blobProject)}`;
}
