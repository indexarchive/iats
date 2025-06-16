import { fetchJson } from "./http";

export class ViewsAPI {
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
