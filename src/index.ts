import { Auth } from "./auth";
import { BookReaderAPI } from "./bookreader";
import * as errors from "./errors";
import { FavoritesAPI } from "./favorites";
import { GifcitiesAPI } from "./gifcities";
import { type AuthData as AuthData_, newEmptyAuth, paramify } from "./http";
import { MetadataAPI } from "./metadata";
import { RelatedAPI } from "./related";
import { ReviewsAPI } from "./reviews";
import { S3API } from "./s3";
import { SearchAPI } from "./search";
import { SearchTextAPI } from "./searchtext";
import { ServicesAPI } from "./services";
import * as types from "./types";
import { ViewsAPI } from "./views";
import { WaybackAPI } from "./wayback";
import { ZipFileAPI } from "./zip";

// it's not unused, I think the namespace is confusing the linter?
// biome-ignore lint/correctness/noUnusedVariables: ^
const ia = {
  Auth: new Auth(),
  BookReaderAPI: new BookReaderAPI(),
  GifcitiesAPI: new GifcitiesAPI(),
  FavoritesAPI: new FavoritesAPI(),
  MetadataAPI: new MetadataAPI(),
  RelatedAPI: new RelatedAPI(),
  ReviewsAPI: new ReviewsAPI(),
  SearchAPI: new SearchAPI(),
  SearchTextAPI: new SearchTextAPI(),
  ServicesAPI: new ServicesAPI(),
  S3API: new S3API(),
  ViewsAPI: new ViewsAPI(),
  WaybackAPI: new WaybackAPI(),
  ZipFileAPI: new ZipFileAPI(),
};

namespace ia {
  export type AuthData = AuthData_;
}

// Thanks https://blog.andrewbran.ch/default-exports-in-commonjs-libraries/ !
// I added additional exports which caused the tsc-generated CJS build to not
// work properly without a specific `.default` import. As a solution we're
// doing this instead of `export default`:
export = {
  ...ia,
  ...types,
  ...errors,
  newEmptyAuth,
  paramify,
};
