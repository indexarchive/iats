import { fetchJson, paramify } from "./http";
import type {
  SearchAPIGetQuery,
  SearchAPIGetResult,
  SearchAPIItem,
} from "./types/search";

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
