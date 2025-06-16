import { corsWorkAround } from "./cors";
import {
  newEmptyAuth,
  type AuthData,
  fetchJson,
  paramify,
  str2arr,
  authToHeaderCookies,
} from "./http";
import { MetadataAPI } from "./metadata";

export class FavoritesAPI {
  API_BASE = corsWorkAround("https://archive.org/bookmarks.php");
  EXPLORE_API_BASE = "https://archive.org/bookmarks-explore.php";

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
      return await fetchJson(`${this.API_BASE}?${paramify(params)}`);
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
    } catch (e) {
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
