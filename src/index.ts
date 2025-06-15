import { DOMParser } from "xmldom";
import type { AuthData } from "./auth";

const CORS_PROXY = "https://iajs-cors.rchrd2.workers.dev";

const enc = encodeURIComponent;
const paramify = (
  obj: Record<string, string | string[] | number | number[] | undefined>,
): URLSearchParams => {
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(obj)) {
    if (Array.isArray(val)) {
      for (const value of val) {
        params.append(key, String(value));
      }
    } else if (val != null) {
      params.set(key, String(val));
    }
  }
  return params;
};
const str2arr = (v: string | string[]) => (Array.isArray(v) ? v : [v]);

const isInBrowser = () => {
  return !(typeof window === "undefined");
};

const corsWorkAround = (url: string) => {
  if (isInBrowser()) {
    return `${CORS_PROXY}/${url}`;
  }
  return url;
};

const fetchJson = async (url: string, options?: RequestInit) => {
  const res = await fetch(
    url,
    options ? { method: "GET", ...options } : { method: "GET" },
  );
  return await res.json();
};

const authToHeaderS3 = (auth: AuthData): Headers => {
  const headers = new Headers();
  if (auth.values.s3.access && auth.values.s3.secret) {
    headers.set(
      "Authorization",
      `LOW ${auth.values.s3.access}:${auth.values.s3.secret}`,
    );
  }
  return headers;
};

const authToHeaderCookies = (auth: AuthData) => {
  if (
    auth.values.cookies["logged-in-sig"] &&
    auth.values.cookies["logged-in-user"]
  ) {
    let cookieStr = `logged-in-sig=${auth.values.cookies["logged-in-sig"]};`;
    cookieStr += ` logged-in-user=${auth.values.cookies["logged-in-user"]}`;
    const headers = { Cookie: cookieStr };
    if (isInBrowser()) {
      headers["X-Cookie-Cors"] = cookieStr;
    }
    return headers;
  }
  return {};
};

const newEmptyAuth = (): AuthData =>
  JSON.parse(
    JSON.stringify({
      success: false,
      values: {
        cookies: { "logged-in-sig": null, "logged-in-user": null },
        email: null,
        itemname: null,
        s3: { access: null, secret: null },
        screenname: null,
      },
      version: 1,
    }),
  );

class Auth {
  XAUTH_BASE = corsWorkAround("https://archive.org/services/xauthn/");

  async login(email: string, password: string) {
    try {
      const fetchOptions = {
        method: "POST",
        body: new URLSearchParams({ email, password }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const response = await fetch(`${this.XAUTH_BASE}?op=login`, fetchOptions);
      const data = await response.json();
      if (!data.success) {
        data.values = { ...data.values, ...newEmptyAuth().values };
      }
      return data;
    } catch (e) {
      // TODO figure out syntax for catching error response
      return newEmptyAuth();
    }
  }

  async fromS3(
    access: string,
    secret: string,
    newAuth: AuthData = newEmptyAuth(),
  ) {
    newAuth.success = 1;
    newAuth.values.s3.access = access;
    newAuth.values.s3.secret = secret;
    const info = await fetchJson("https://s3.us.archive.org?check_auth=1", {
      headers: authToHeaderS3(newAuth),
    });
    newAuth.values.email = info.username;
    newAuth.values.itemname = info.itemname;
    newAuth.values.screenname = info.screenname;
    // Note the auth object is missing cookie fields.
    // It is still TBD if those are needed
    return newAuth;
  }

  async fromCookies(
    loggedInSig: string,
    loggedInUser: string,
    newAuth: AuthData = newEmptyAuth(),
  ) {
    newAuth.values.cookies["logged-in-sig"] = loggedInSig;
    newAuth.values.cookies["logged-in-user"] = loggedInUser;
    const s3response = await fetch(
      corsWorkAround("https://archive.org/account/s3.php?output_json=1"),
      {
        headers: authToHeaderCookies(newAuth),
      },
    );
    const s3 = await s3response.json();
    if (!s3.success) {
      throw new Error();
    }
    return await this.fromS3(s3.key.s3accesskey, s3.key.s3secretkey, newAuth);
  }
}

class BookReaderAPI {}

class FavoritesAPI {
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
      const mdResponse = await iajs.MetadataAPI.get({
        identifier: params.identifier,
        path: "/metadata",
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

class GifcitiesAPI {
  API_BASE = "https://gifcities.archive.org/api/v1/gifsearch";

  async get({ q }: { q?: string | null } = {}) {
    if (q == null) return [];
    return fetchJson(`${this.API_BASE}?${new URLSearchParams({ q })}`);
  }

  async search(q: string) {
    return this.get({ q });
  }
}

class MetadataAPI {
  READ_API_BASE = "https://archive.org/metadata";
  WRITE_API_BASE = corsWorkAround("https://archive.org/metadata");

  async get({
    identifier,
    path = "",
    auth = newEmptyAuth(),
  }: {
    identifier: string;
    path?: string;
    auth?: AuthData;
  }) {
    return fetchJson(`${this.READ_API_BASE}/${identifier}/${path}`, {
      headers: authToHeaderS3(auth),
    });
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
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return await response.json();
  }
}

class RelatedAPI {
  API_BASE = "https://be-api.us.archive.org/mds/v1";

  async get({ identifier = null } = {}) {
    return fetchJson(`${this.API_BASE}/get_related/all/${identifier}`);
  }
}

class ReviewsAPI {
  WRITE_API_BASE = corsWorkAround(
    "https://archive.org/services/reviews.php?identifier=",
  );
  READ_API_BASE = "https://archive.org/metadata";

  async get({ identifier = null } = {}) {
    return fetchJson(`${this.READ_API_BASE}/${identifier}/reviews`);
  }
  async add({
    identifier = null,
    title = null,
    body = null,
    stars = null,
    auth = newEmptyAuth(),
  } = {}) {
    const url = `${this.WRITE_API_BASE}${identifier}`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ title, body, stars }),
      headers: {
        "Content-Type": "application/json",
        ...authToHeaderS3(auth),
      },
    });
    return await response.json();
  }
}

class S3API {
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

type SearchGetQuery = Record<string, unknown> | string;

class SearchAPI {
  API_BASE = "https://archive.org/advancedsearch.php";

  async get({
    q,
    page = 1,
    fields = ["identify"],
    sort,
    ...options
  }: {
    q: SearchGetQuery;
    page?: number;
    fields?: string[];
    sort?: string;
  } & Record<string, unknown>) {
    if (typeof q === "object") {
      q = this.buildQueryFromObject(q);
    }
    const url = `${this.API_BASE}?${paramify({
      q,
      page,
      "fl[]": fields,
      sort,
      ...options,
      output: "json",
    })}`;
    return fetchJson(url);
  }

  async search(q: SearchGetQuery) {
    return await this.get({ q });
  }

  buildQueryFromObject(qObject: Record<string, unknown>) {
    // Map dictionary to a key=val search query
    return Object.entries(qObject)
      .map(([key, value]) => {
        // allow any-field search by omitting prefix
        const prefix = key === "" ? "" : `${key}:`;
        if (Array.isArray(value)) {
          return `${prefix}( ${value.map((v) => `"${v}"`).join(" OR ")} )`;
        }
        // allow wildcard search
        if (value === "*") {
          return `${prefix}*`;
        }
        return `${prefix}"${value}"`;
      })
      .join(" AND ");
  }
}

class SearchTextAPI {}

class ViewsAPI {
  // https://be-api.us.archive.org/views/v1/short/<identifier>[,<identifier>,...]
  API_BASE = "https://be-api.us.archive.org/views/v1/short";

  async get({ identifier }: { identifier: string | string[] }) {
    return fetchJson(
      `${this.API_BASE}/${
        Array.isArray(identifier) ? identifier.join(",") : identifier
      }`,
    );
  }
}

class WaybackAPI {
  AVAILABLE_API_BASE = "https://archive.org/wayback/available";
  CDX_API_BASE = corsWorkAround("https://web.archive.org/cdx/search/");
  SAVE_API_BASE = corsWorkAround("https://web.archive.org/save/");

  /**
   * @see https://archive.org/help/wayback_api.php
   */
  async available({
    url,
    timestamp,
  }: { url: string; timestamp?: string | null }) {
    const params = new URLSearchParams({ url });
    if (timestamp != null) {
      params.set("timestamp", timestamp);
    }
    const response = await fetch(`${this.AVAILABLE_API_BASE}?${params}`);
    return await response.json();
  }

  /**
   * @see https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server
   */
  async cdx(options: Record<string, unknown>) {
    const response = await fetch(
      `${this.CDX_API_BASE}?${paramify({ ...options, output: "json" })}`,
    );
    const raw = await response.text();
    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch (e) {
      json = { error: raw.trim() };
    }
    return json;
  }
  /**
   * @see https://docs.google.com/document/d/1Nsv52MvSjbLb2PCpHlat0gkzw0EvtSgpKHu4mk0MnrA/edit
   */
  async savePageNow({
    url,
    captureOutlinks = false,
    captureAll = true,
    captureScreenshot = false,
    skipFirstArchive = true,
    ifNotArchivedWithin,
    auth = newEmptyAuth(),
  }: {
    url: string;
    /**
     * Capture web page outlinks automatically. This also applies to PDF,
     * JSON, RSS and MRSS feeds.
     */
    captureOutlinks?: boolean;
    /**
     * Capture a web page with errors (HTTP status=4xx or 5xx). By default
     * SPN2 captures only status=200 URLs.
     */
    captureAll?: boolean;
    /**
     * Capture full page screenshot in PNG format. This is also stored in
     * the Wayback Machine as a different capture.
     */
    captureScreenshot?: boolean;
    /**
     * Skip checking if a capture is a first if you don’t need this
     * information. This will make captures run faster.
     */
    skipFirstArchive?: boolean;
    /**
     * Capture web page only if the latest existing capture at the Archive is
     * older than the provided limit. Its format could be any datetime
     * expression like "3d 5h 20m" or just a number of seconds, e.g. `120`.
     * If there is a capture within the defined timedelta, SPN2 returns that
     * as a recent capture. The default value is 45 min.
     */
    ifNotArchivedWithin?: string | number;
    auth?: AuthData;
  }) {
    const params = new URLSearchParams({
      url: url.replace(/^https?\:\/\//, ""),
      capture_outlinks: captureOutlinks ? "1" : "0",
      capture_screenshot: captureScreenshot ? "1" : "0",
      capture_all: captureAll ? "1" : "0",
      skip_first_archive: skipFirstArchive ? "1" : "0",
    });
    if (ifNotArchivedWithin) {
      params.set("if_not_archived_within", String(ifNotArchivedWithin));
    }
    const response = await fetch(this.SAVE_API_BASE, {
      credentials: "omit",
      method: "POST",
      body: params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        ...authToHeaderS3(auth),
      },
    });
    return await response.json();
  }
}

class ZipFileAPI {
  /**
   * List the contents of a zip file in an item
   * Eg: https://archive.org/download/goodytwoshoes00newyiala/goodytwoshoes00newyiala_jp2.zip/
   */
  async ls(
    identifier: string,
    zipPath: string,
    auth: AuthData = newEmptyAuth(),
  ) {
    if (!zipPath.match(/\.(7z|cbr|cbz|cdr|iso|rar|tar|zip)$/)) {
      throw new Error("Invalid zip type");
    }
    const requestUrl = corsWorkAround(
      `https://archive.org/download/${identifier}/${enc(zipPath)}/`,
    );
    const response = await fetch(requestUrl, {
      headers: authToHeaderCookies(auth),
    });
    if (response.status !== 200) {
      throw Error("not found");
    }

    const html = await response.text();
    let tableHtml = html;

    // This page has <td>'s without closing el tags (took a while to
    // figure this out). This breaks the DOMparser, so I added a workaround
    // to add closing tags
    const match = html.match(/(<table class="archext">[\w\W]*<\/table>)/g);
    if (match) {
      tableHtml = match[0].replace(
        /(<td[^>]*>[\w\W]*?)(?=<(?:td|\/tr))/g,
        "$1</td>",
      );
    }

    const table = new DOMParser().parseFromString(tableHtml);
    const rows = table.getElementsByTagName("tr");
    const results: {
      key: string | null;
      href: string;
      jpegUrl: string | null;
      timestamp: string | null;
      size: string | null;
    }[] = [];
    for (let i = 0; i < rows.length; i++) {
      const cells =
        rows.item(i)?.getElementsByTagName("td") ?? new HTMLCollection();
      if (cells.length !== 4) continue;
      try {
        const a = cells.item(0)?.getElementsByTagName("a").item(0);
        if (a) {
          results.push({
            key: a.textContent,
            href: `https:${a.getAttribute("href")}`,
            jpegUrl: (() => {
              try {
                const href = cells
                  .item(1)
                  ?.getElementsByTagName("a")
                  .item(0)
                  ?.getAttribute("href");
                if (href) return `https:${href}`;
              } catch {}
              return null;
            })(),
            timestamp: cells.item(2)?.textContent ?? null,
            size: cells.item(3)?.textContent ?? null,
          });
        }
      } catch (e) {}
    }
    return results;
  }
}

const iajs = {
  Auth: new Auth(),
  BookReaderAPI: new BookReaderAPI(),
  GifcitiesAPI: new GifcitiesAPI(),
  FavoritesAPI: new FavoritesAPI(),
  MetadataAPI: new MetadataAPI(),
  RelatedAPI: new RelatedAPI(),
  ReviewsAPI: new ReviewsAPI(),
  SearchAPI: new SearchAPI(),
  SearchTextAPI: new SearchTextAPI(),
  S3API: new S3API(),
  ViewsAPI: new ViewsAPI(),
  WaybackAPI: new WaybackAPI(),
  ZipFileAPI: new ZipFileAPI(),
};

export default iajs;
