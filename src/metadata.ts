import { corsWorkAround } from "./cors";
import { type AuthData, authToHeaderS3, fetchJson, newEmptyAuth } from "./http";
import type { MetadataAPIItem } from "./types/metadata";

export class MetadataAPI {
  READ_API_BASE = "https://archive.org/metadata";
  WRITE_API_BASE = corsWorkAround("https://archive.org/metadata");

  /**
   * fetch metadata for an item
   * @param options options for fetching the item's metadata
   *   - `identifier`: the identifier of the item.
   *   - `path`: a subpath in the metadata. if this is specified, the returned
   *      data will be nested in a `result` value. if requesting an array, a
   *      specific item can be requested by index: `files/0`
   *   - `auth`: authentication
   * @returns the metadata for the whole item or inner path as requested
   */
  get<T extends undefined>(options?: {
    identifier: string;
    path?: T;
    auth?: AuthData;
  }): Promise<MetadataAPIItem>;
  get<T extends keyof MetadataAPIItem>(options?: {
    identifier: string;
    path?: T;
    auth?: AuthData;
  }): Promise<{ result: MetadataAPIItem[T] }>;
  async get<T extends keyof MetadataAPIItem | undefined>(options: {
    identifier: string;
    path?: T;
    auth?: AuthData;
  }): Promise<
    T extends keyof MetadataAPIItem
      ? { result: MetadataAPIItem[T] }
      : MetadataAPIItem
  > {
    const { identifier, path, auth = newEmptyAuth() } = options;
    let url = `${this.READ_API_BASE}/${identifier}`;
    if (path) url = `${url}/${path}`;

    return fetchJson(url, { headers: authToHeaderS3(auth) });
  }

  async patch({
    identifier,
    target = "metadata",
    priority = -5,
    patch = {},
    auth = newEmptyAuth(),
  }: {
    identifier: string;
    target?: string;
    priority?: number;
    patch?: unknown;
    auth?: AuthData;
  }) {
    // https://archive.org/services/docs/api/metadata.html#targets
    const body = new URLSearchParams({
      "-target": target,
      "-patch": JSON.stringify(patch),
      priority: String(priority),
    });
    if (auth.values.s3.secret) body.set("secret", auth.values.s3.secret);
    if (auth.values.s3.access) body.set("access", auth.values.s3.access);

    const url = `${this.WRITE_API_BASE}/${identifier}`;
    const response = await fetch(url, {
      method: "POST",
      body: body.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return await response.json();
  }
}
