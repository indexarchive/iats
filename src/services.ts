import { corsWorkAround } from "./cors";
import { ArchiveError } from "./errors";
import {
  type AuthData,
  authToHeaderCookies,
  fetchJson,
  newEmptyAuth,
} from "./http";
import type {
  ServicesAPIBetaSearchPageType,
  ServicesAPIAccountPageElement,
  ServicesAPIBetaSearchAccountBody,
  ServicesAPIBetaSearchBody,
  ServicesAPIBetaSearchCollectionBody,
  ServicesAPIGetBetaSearch,
  ServicesAPIGetUserListResponse,
  ServicesAPISearchBackend,
  ServicesAPIUserList,
  ServicesAPIUserListItem,
  ServicesAPIUserListWithItem,
} from "./types/services";

interface BetaSearchOptions<
  T extends ServicesAPIBetaSearchPageType = undefined,
> {
  backend?: ServicesAPISearchBackend;
  query?: string;
  pageType?: T;
  pageTarget?: string;
  hits?: number;
  page?: number;
  aggregations?: boolean;
  aggregationsSize?: number;
  sort?: string;
  uid?: string;
  clientUrl?: string;
  auth?: AuthData;
}

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
    options: { user?: string; item?: T; auth?: AuthData } = {},
  ): Promise<
    T extends string ? ServicesAPIUserListWithItem[] : ServicesAPIUserList[]
  > {
    const { user = "me", item, auth = newEmptyAuth() } = options;

    const url = new URL(`${this.READ_API_BASE}/users/${user}/lists`);
    if (item) url.searchParams.set("item", item);

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

  /**
   * Use the beta search service endpoint. The `SearchAPI` interface should be
   * preferred, both because of its developer-friendliness and because it is
   * properly documented.
   *
   * This endpoint does not return exclusively items. Hits are discriminated
   * by `hit_type`.
   * @param options options for the request.
   * - `backend`: restrict results to a specific service backend.
   * - `query`: a query to include in the search, by default, for e.g.
   *   collections, all items in the collection will be returned.
   * - `pageType`: the type of page to search (like `collection_details`)
   * - `pageTarget`: the target of the specified page type (e.g. the
   *   collection identifier).
   * - `pageElements`: for applicable page types, the specific elements to
   *   return in the response body
   * - `hits`: the number of hits to return in the response (default 100)
   * - `page`: page number (1-indexed) (default 1)
   * - `aggregations`: unknown
   * - `uid`: unknown
   * - `sort`: order hits by field and asc/desc (like `publicdate desc`)
   * - `clientUrl`: the qualified URL that this request may have originated
   *   from
   * - `auth`: authentication data
   * @returns an object containing `hits` (search results) and some other
   * useful data
   */
  async betaSearch(
    options: BetaSearchOptions<ServicesAPIBetaSearchPageType.Collection>,
  ): Promise<ServicesAPIBetaSearchCollectionBody>;
  async betaSearch<
    Elements extends
      ServicesAPIAccountPageElement[] = ServicesAPIAccountPageElement[],
  >(
    options: BetaSearchOptions<ServicesAPIBetaSearchPageType.Account> & {
      pageElements?: Elements;
    },
  ): Promise<ServicesAPIBetaSearchAccountBody<Elements>>;
  async betaSearch(
    options: BetaSearchOptions<ServicesAPIBetaSearchPageType>,
  ): Promise<ServicesAPIBetaSearchBody> {
    const {
      backend,
      query = "",
      pageType: page_type,
      pageTarget: page_target,
      hits = 100,
      page = 1,
      aggregations = false,
      aggregationsSize,
      sort,
      uid,
      clientUrl,
      auth = newEmptyAuth(),
    } = options;

    const params = new URLSearchParams({
      user_query: query,
      page_type,
      page_target,
      hits_per_page: String(hits),
      page: String(page),
      aggregations: String(aggregations),
    });
    if ("pageElements" in options) {
      params.set("page_elements", JSON.stringify(options.pageElements));
    }
    if (backend) params.set("service_backend", backend);
    if (sort) params.set("sort", sort);
    if (aggregationsSize !== undefined) {
      params.set("aggregations_size", String(aggregationsSize));
    }
    if (uid) params.set("uid", uid);
    if (clientUrl) params.set("client_url", clientUrl);

    const url = `${this.READ_API_BASE}/search/beta/page_production/?${params}`;
    const data = await fetchJson<
      ServicesAPIGetBetaSearch<ServicesAPIBetaSearchBody>
    >(url, authToHeaderCookies(auth));
    return data.response.body;
  }
}
