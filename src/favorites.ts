import { corsWorkAround } from "./cors";
import {
  type AuthData,
  authToHeaderCookies,
  fetchJson,
  newEmptyAuth,
  paramify,
  str2arr,
} from "./http";
import { MetadataAPI } from "./metadata";
import type { FavoritesAPIBookmark } from "./types";

export class FavoritesAPI {
  API_BASE = corsWorkAround("https://archive.org/bookmarks.php");
  // Not sure what this is for
  // EXPLORE_API_BASE = "https://archive.org/bookmarks-explore.php";

  async get({
    screenname = null,
    auth = newEmptyAuth(),
  }: {
    screenname?: string | null;
    auth?: AuthData;
  }) {
    if (!screenname && auth.values.screenname) {
      screenname = auth.values.screenname;
    }
    if (screenname) {
      const params = { output: "json", screenname };
      try {
        const data = await fetchJson<FavoritesAPIBookmark[]>(
          `${this.API_BASE}?${paramify(params)}`,
        );
        return data;
      } catch (e) {
        if (e instanceof SyntaxError) {
          // IA returns invalid JSON for users with no
          // bookmarks (a single end square bracket)
          return [];
        }
        throw e;
      }
    }
    throw new Error("Neither screenname or auth provided for bookmarks lookup");
  }

  async add({
    identifier,
    auth = newEmptyAuth(),
  }: {
    identifier: string;
    auth?: AuthData;
  }) {
    return await this.modify({ identifier, add_bookmark: 1 }, auth);
  }

  async remove({
    identifier,
    auth = newEmptyAuth(),
  }: {
    identifier: string;
    auth?: AuthData;
  }) {
    return await this.modify({ identifier, del_bookmark: identifier }, auth);
  }

  async modify(
    params: {
      identifier: string;
    } & Record<string, unknown>,
    auth: AuthData,
  ) {
    try {
      const mdResponse = await new MetadataAPI().get({
        identifier: params.identifier,
        path: "metadata",
      });
      params.title = str2arr(mdResponse.result.title).join(", ");
      params.mediatype = mdResponse.result.mediatype;
    } catch {
      throw new Error(`Metadata lookup failed for: ${params.identifier}`);
    }
    const response = await fetch(
      `${this.API_BASE}?${paramify({
        ...params,
        output: "json",
      })}`,
      {
        method: "POST",
        headers: authToHeaderCookies(auth),
      },
    );
    return await response.json().catch((e) => {
      return { error: e };
    });
  }
}
