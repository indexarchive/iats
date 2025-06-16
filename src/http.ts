import { isInBrowser } from "./cors";

export const enc = encodeURIComponent;

export const paramify = (
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

export const str2arr = (v: string | string[]) => (Array.isArray(v) ? v : [v]);

// biome-ignore lint/suspicious/noExplicitAny:
export const fetchJson = async <T = any>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(
    url,
    options ? { method: "GET", ...options } : { method: "GET" },
  );
  return (await res.json()) as T;
};

export interface AuthData {
  success: boolean | number;
  values: {
    cookies: {
      "logged-in-sig"?: string | null;
      "logged-in-user"?: string | null;
    };
    email: string | null;
    itemname: string | null;
    s3: { access: string | null; secret: string | null };
    screenname: string | null;
  };
  version: number;
}

export const authToHeaderS3 = (auth: AuthData): Headers => {
  const headers = new Headers();
  if (auth.values.s3.access && auth.values.s3.secret) {
    headers.set(
      "Authorization",
      `LOW ${auth.values.s3.access}:${auth.values.s3.secret}`,
    );
  }
  return headers;
};

export const authToHeaderCookies = (auth: AuthData) => {
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

export const newEmptyAuth = (): AuthData =>
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
