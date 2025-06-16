import { fetchJson } from "./http";

export class GifcitiesAPI {
  API_BASE = "https://gifcities.archive.org/api/v1/gifsearch";

  async get({ q }: { q: string }) {
    if (!q) return [];
    return fetchJson(`${this.API_BASE}?${new URLSearchParams({ q })}`);
  }

  async search(q: string) {
    return this.get({ q });
  }
}
