import { DOMParser } from "xmldom";
import { corsWorkAround } from "./cors";
import { type AuthData, authToHeaderCookies, enc, newEmptyAuth } from "./http";

export class ZipFileAPI {
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

    const table = new DOMParser().parseFromString(tableHtml, "text/html");
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
