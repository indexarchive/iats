import { corsWorkAround } from "./cors";
import {
  type AuthData,
  authToHeaderCookies,
  authToHeaderS3,
  fetchJson,
  newEmptyAuth,
} from "./http";

export class Auth {
  XAUTH_BASE = corsWorkAround("https://archive.org/services/xauthn/");

  async login(email: string, password: string): Promise<AuthData> {
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
    } catch {
      // TODO figure out syntax for catching error response
      return newEmptyAuth();
    }
  }

  async fromS3(
    access: string,
    secret: string,
    newAuth: AuthData = newEmptyAuth(),
  ): Promise<AuthData> {
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
  ): Promise<AuthData> {
    newAuth.values.cookies["logged-in-sig"] = loggedInSig;
    newAuth.values.cookies["logged-in-user"] = loggedInUser;
    const s3response = await fetch(
      corsWorkAround("https://archive.org/account/s3.php?output_json=1"),
      { headers: authToHeaderCookies(newAuth) },
    );
    const s3 = await s3response.json();
    if (!s3.success) {
      throw new Error();
    }
    return await this.fromS3(s3.key.s3accesskey, s3.key.s3secretkey, newAuth);
  }
}
