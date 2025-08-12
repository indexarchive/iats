import type { ItemMediaType } from "./search";

export enum FavoritesAPIKind {
  Favorite = "favorite",
}

export interface FavoritesAPIBookmark {
  /** The user's itemname with prefixing `@` */
  userid: string;
  // I assume there are other possible kinds but I haven't encountered them
  kind: FavoritesAPIKind;
  /**
   * A collection identifier of the user's favorites, usually (always?)
   * starts with `fav-`.
   */
  listname: string;
  identifier: string;
  updateddate: string;
  media: string;
  title: string;
  /** A comment the user may have left on the bookmark, may be a blank string */
  comments: string;
  /**
   * @warning When favoriting a user, the value here may be `profile` while
   * the mediatype on the account's metadata page is instead `account`.
   */
  mediatype: ItemMediaType;
}
