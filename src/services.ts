import { corsWorkAround } from "./cors";
import { ArchiveError } from "./errors";
import {
  type AuthData,
  authToHeaderCookies,
  fetchJson,
  newEmptyAuth,
} from "./http";
import type {
  ServicesAPIGetUserListResponse,
  ServicesAPIUserList,
  ServicesAPIUserListItem,
  ServicesAPIUserListWithItem,
} from "./types/services";

export class ServicesAPI {
  READ_API_BASE = "https://archive.org/services";
  WRITE_API_BASE = corsWorkAround("https://archive.org/services");

  /**
   * Get a list of all lists on the account
   * @param options options for the request.
   * - `user`: the user itemname to query. defaults to `me` (the current user).
   * - `item`: if provided, returns additional fields indicating whether the
   *   item (by identifier) is a member of each of the user's lists, and if so,
   *   which member ID it has.
   * - `auth`: authentication data. cookies are required to access private
   *   lists.
   */
  getLists<T extends undefined>(options?: {
    user?: string;
    item?: T;
    auth?: AuthData;
  }): Promise<ServicesAPIUserList[]>;
  getLists<T extends string>(options?: {
    user?: string;
    item?: T;
    auth?: AuthData;
  }): Promise<ServicesAPIUserListWithItem[]>;
  async getLists<T extends string | undefined>(
    options: {
      user?: string;
      item?: T;
      auth?: AuthData;
    } = {},
  ): Promise<
    T extends string ? ServicesAPIUserListWithItem[] : ServicesAPIUserList[]
  > {
    const { user = "me", item, auth = newEmptyAuth() } = options;
    const base = `${this.READ_API_BASE}/users/${user}/lists`;
    const params = new URLSearchParams();
    if (item) params.set("item", item);

    const url = `${base}?${params}`;
    const data = await fetchJson(
      url,
      { headers: authToHeaderCookies(auth) },
      true,
    );
    return data.value;
  }

  /**
   * Get a single list on the account.
   * @param options options for the request.
   * - `user`: the user itemname to query. defaults to `me` (the current user).
   * - `listId`: ID of the list
   * - `auth`: authentication data. cookies are required to access private
   *   lists.
   * @returns the requested list
   */
  async getList(options: {
    user?: string;
    listId: number;
    auth: AuthData;
  }): Promise<ServicesAPIUserList> {
    const { user = "me", listId, auth } = options;

    // same as /members
    const url = `${this.WRITE_API_BASE}/users/${user}/lists/${listId}`;
    const data = await fetchJson<ServicesAPIGetUserListResponse>(
      url,
      { headers: authToHeaderCookies(auth) },
      true,
    );
    return data.value;
  }

  /**
   * Modify list details.
   * @param options options for the request.
   * - `user`: the user itemname to query. defaults to `me` (the current user).
   * - `listId`: ID of the list to modify
   * - `name`: new name for the list
   * - `description`: new description for the list (set to empty string to
   *   clear)
   * - `private`: whether the list should be private
   * - `auth`: authentication data. cookies are required to access private
   *   lists.
   * @returns
   */
  async modifyList(options: {
    user?: string;
    listId: number;
    name?: string;
    description?: string;
    private?: boolean;
    auth: AuthData;
  }): Promise<ServicesAPIUserList> {
    const { user = "me", listId, auth, ...body } = options;

    const url = `${this.WRITE_API_BASE}/users/${user}/lists/${listId}`;
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        list_name: body.name,
        description: body.description,
        is_private: body.private,
      }),
      headers: {
        "Content-Type": "application/json",
        ...authToHeaderCookies(auth),
      },
    });
    const data = await response.json();
    if (!data.success || !response.ok) {
      throw new ArchiveError("PATCH", response, data);
    }
    return data.value;
  }

  /**
   * Add a member to a list.
   * @param options options for the request.
   * - `user`: the user itemname to query. defaults to `me` (the current user).
   * - `listId`: ID of the list
   * - `identifier`: the identifier of the item to add. this can be a member
   *   already present in the list or even an identifier that does not exist.
   *   in both cases, a new member will be created.
   * - `auth`: authentication data. cookies are required to access private
   *   lists.
   * @returns the created list member
   */
  async addToList(options: {
    user?: string;
    listId: number;
    identifier: string;
    auth: AuthData;
  }): Promise<ServicesAPIUserListItem> {
    const { user = "me", listId, identifier, auth } = options;

    const url = `${this.WRITE_API_BASE}/users/${user}/lists/${listId}/members`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ identifier }),
      headers: {
        "Content-Type": "application/json",
        ...authToHeaderCookies(auth),
      },
    });
    const data = await response.json();
    if (!data.success || !response.ok) {
      throw new ArchiveError("POST", response, data);
    }
    return data.value;
  }

  /**
   * Returns a URL to a low resolution (180w) thumbnail for the item. For most
   * items, the content will be the `__ia_thumb.jpg` file. For users, it will
   * be their avatar. If a thumbnail cannot be determined, the image will be a
   * generic placeholder with the archive.org logo (or it may redirect to
   * `/images/notfound.png`).
   * @param identifier the identifier for the item
   * @returns the constructed URL
   */
  getItemImageUrl(identifier: string): string {
    return `${this.READ_API_BASE}/img/${identifier}`;
  }
}
