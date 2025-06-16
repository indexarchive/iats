import { paramify, fetchJson } from "./http";

export interface SearchAPIItem {
  avg_rating: string;
  backup_location: string;
  btih: string;
  call_number: string;
  collection: string;
  contributor: string;
  coverage: string;
  creator?: string | string[];
  date?: string;
  description: string;
  downloads: string | number;
  "external-identifier"?: string;
  foldoutcount: string;
  format: string[];
  genre: string;
  identifier: string;
  imagecount: string;
  indexflag: string;
  item_size: string | number;
  language: string;
  licenseurl: string;
  mediatype: string;
  members: string;
  name?: string;
  noindex: string;
  num_reviews: string;
  oai_updatedate: string;
  publicdate: string;
  publisher: string;
  "related-external-id"?: string;
  reviewdate: string;
  rights: string;
  scanningcentre: string;
  source: string;
  stripped_tags: string;
  /** if string, semicolon-separated */
  subject: string | string[];
  title: string;
  type: string;
  volume: string;
  week: string | number;
  month: string | number;
  year?: number;
}

export type SearchAPIGetQuery = Record<string, unknown> | string;

export interface SearchAPIGetResponseParams {
  /** The query passed to `q`, URL-decoded and parsed/expanded by the server */
  query: string;
  /** The raw un-decoded query passed to `q` */
  qin: string;
  /** Comma-separated list of requested fields */
  fields: string;
  /** Requested output format */
  wt: "json";
  /** Total requested rows */
  rows: number;
  /** Requested start index */
  start: number;
}

export interface SearchAPIGetResult<T extends keyof SearchAPIItem> {
  responseHeader: {
    /** Should usually be 0 for a successful search */
    status: number;
    QTime: number;
    params: SearchAPIGetResponseParams;
  };
  response: {
    /** Total number of results found */
    numFound: number;
    /**
     * The index of all results that `docs` starts at (should mirror your
     * input `start` param or default to 0)
     */
    start: number;
    /** Resultant items for your query, may be an empty list */
    docs: Pick<SearchAPIItem, T>[];
  };
}

export class SearchAPI {
  API_BASE = "https://archive.org/advancedsearch.php";

  async get<T extends keyof SearchAPIItem>(
    options: {
      q: SearchAPIGetQuery;
      page?: number;
      fields?: T[];
      sort?: string;
    } & Record<string, unknown>,
  ): Promise<SearchAPIGetResult<T>> {
    let { q, page = 1, fields = ["identifier"], sort, ...rest } = options;
    if (typeof q === "object") {
      q = this.buildQueryFromObject(q);
    }

    const url = `${this.API_BASE}?${paramify({
      q,
      page,
      "fl[]": fields,
      sort,
      ...rest,
      output: "json",
    })}`;
    return fetchJson(url);
  }

  search(q: SearchAPIGetQuery) {
    return this.get({ q });
  }

  /**
   * convert an object representing a query to a string for the advanced
   * search API.
   * @see https://archive.org/advancedsearch.php
   * @param query keys in an object are joined by "AND", whereas items in an
   * array are joined with "OR". If any inner value is not a string, it will
   * be converted.
   * ```js
   * buildQueryFromObject({ title: "foo", subject: ["educational", "sports"] })
   * // result:
   * // title:"foo" AND ( subject:"educational" OR subject:"sports" )
   * ```
   *
   * Values enclosed in parentheses will not be quoted, since this indicates a
   * vague or "contains" match:
   * ```js
   * buildQueryFromObject({ title: "(bar)", subject: ["educational", "(baz)"] })
   * // result:
   * // title:(bar) AND ( subject:"educational" OR subject:(baz) )
   * ```
   * Values equalling `*` or those enclosed in double quotes or square brackets
   * will also not be modified.
   *
   * Blank keys will be given no prefix to match the "any field" behavior:
   * ```js
   * buildQueryFromObject({ "": "(fuzzy)", subject: "cat" })
   * // result:
   * // (fuzzy) AND subject:"cat"
   * ```
   * @returns compiled string
   */
  buildQueryFromObject(query: Record<string, unknown>): string {
    const wrapValue = (value: unknown): string => {
      const val = String(value);
      if (
        (val.startsWith("(") && val.endsWith(")")) ||
        (val.startsWith(`"`) && val.endsWith(`"`)) ||
        (val.startsWith("[") && val.endsWith("]")) ||
        val === "*"
      ) {
        return val;
      }
      return `"${val}"`;
    };
    return Object.entries(query)
      .map(([key, value]) => {
        // allow any-field search by omitting prefix
        const prefix = key === "" ? "" : `${key}:`;
        if (Array.isArray(value)) {
          return `${prefix}( ${value.map((v) => wrapValue(v)).join(" OR ")} )`;
        }
        // allow the user to quote or parenthesize their own values
        return `${prefix}${wrapValue(value)}`;
      })
      .join(" AND ");
  }
}
