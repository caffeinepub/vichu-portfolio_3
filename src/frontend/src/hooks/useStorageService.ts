import { HttpAgent } from "@icp-sdk/core/agent";
import { useQuery } from "@tanstack/react-query";
import { loadConfig } from "../config";
import { StorageClient } from "../utils/StorageClient";
import { useInternetIdentity } from "./useInternetIdentity";

export function useStorageService() {
  const { identity } = useInternetIdentity();
  const principalKey = identity?.getPrincipal().toString() ?? "anon";

  const { data: client } = useQuery({
    queryKey: ["storageClient", principalKey],
    queryFn: async () => {
      const config = await loadConfig();
      const agent = new HttpAgent({
        host: config.backend_host,
        identity: identity ?? undefined,
      });
      if (config.backend_host?.includes("localhost")) {
        await agent.fetchRootKey().catch(console.warn);
      }
      return new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );
    },
    staleTime: Number.POSITIVE_INFINITY,
  });

  const uploadFile = async (file: File): Promise<string> => {
    if (!client) throw new Error("Storage not ready");
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { hash } = await client.putFile(bytes);
    return hash;
  };

  return { storageClient: client ?? null, uploadFile, isReady: !!client };
}
