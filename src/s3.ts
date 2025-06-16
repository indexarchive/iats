import { newEmptyAuth, type AuthData, str2arr, authToHeaderS3 } from "./http";

export class S3API {
  API_BASE = "https://s3.us.archive.org";

  async ls({ identifier = null, auth = newEmptyAuth() } = {}) {
    // throw new Error("TODO parse that XML");
    if (!identifier) {
      throw new Error("Missing required args");
    }
    return await (await fetch(`${this.API_BASE}/${identifier}`)).text();
  }

  async createEmptyItem({
    identifier,
    testItem = false,
    metadata = {},
    headers = {},
    wait = true,
    auth = newEmptyAuth(),
  }: {
    identifier: string;
    testItem?: boolean;
    metadata?: Record<string, string>;
    headers?: Record<string, string>;
    wait?: boolean;
    auth?: AuthData;
  }) {
    return await this.upload({
      identifier,
      testItem,
      metadata,
      headers,
      wait,
      auth,
      autocreate: true,
    });
  }

  async upload({
    identifier,
    key,
    body,
    autocreate = false,
    skipDerive = false,
    testItem = false,
    keepOldVersions = true,
    metadata = {},
    headers = {},
    wait = true,
    auth = newEmptyAuth(),
  }: {
    identifier: string;
    key?: string;
    body?: BodyInit;
    autocreate?: boolean;
    skipDerive?: boolean;
    testItem?: boolean;
    keepOldVersions?: boolean;
    metadata?: Record<string, string>;
    headers?: Record<string, string>;
    wait?: boolean;
    auth?: AuthData;
  }) {
    if (!identifier) {
      throw new Error("Missing required args");
    }

    if (testItem) {
      metadata.collection = "test_collection";
    }

    const requestHeaders: Record<string, string> = {};
    for (const k of Object.keys(metadata)) {
      let i = 0;
      for (const v of str2arr(metadata[k])) {
        const headerKey = `x-archive-meta${i}-${k.replace(/_/g, "--")}`;
        requestHeaders[headerKey] = v;
        i += 1;
      }
    }

    Object.assign(requestHeaders, headers, authToHeaderS3(auth));

    if (autocreate) {
      requestHeaders["x-archive-auto-make-bucket"] = "1";
    }
    if (skipDerive) {
      requestHeaders["x-archive-queue-derive"] = "0";
    }
    requestHeaders["x-archive-keep-old-version"] = keepOldVersions ? "1" : "0";

    const requestUrl = key
      ? `${this.API_BASE}/${identifier}/${key}`
      : `${this.API_BASE}/${identifier}`;

    const response = await fetch(requestUrl, {
      method: "PUT",
      headers: requestHeaders,
      body,
    });

    if (response.status !== 200) {
      // NOTE this may not be the right thing to check.
      // Maybe different codes are okay
      throw new Error(`Response: ${response.status}`);
    }

    if (!wait) {
      return response;
    }
    // The finished response seems to be empty
    return await response.text();
  }
}
