import { fetchJson } from "./http";

export class RelatedAPI {
  API_BASE = "https://be-api.us.archive.org/mds/v1";

  async get({ identifier = null } = {}) {
    return fetchJson(`${this.API_BASE}/get_related/all/${identifier}`);
  }
}
