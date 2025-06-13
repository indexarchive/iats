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
