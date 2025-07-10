import { corsWorkAround } from "./cors";
import { type AuthData, authToHeaderS3, newEmptyAuth, paramify } from "./http";

export class WaybackAPI {
  AVAILABLE_API_BASE = "https://archive.org/wayback/available";
  CDX_API_BASE = corsWorkAround("https://web.archive.org/cdx/search/");
  SAVE_API_BASE = corsWorkAround("https://web.archive.org/save/");

  /**
   * @see https://archive.org/help/wayback_api.php
   */
  async available({
    url,
    timestamp,
  }: {
    url: string;
    timestamp?: string | null;
  }) {
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
    } catch {
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
      url: url.replace(/^https?:\/\//, ""),
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
