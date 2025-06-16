import { corsWorkAround } from "./cors";
import { fetchJson, newEmptyAuth, authToHeaderS3 } from "./http";

export class ReviewsAPI {
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
