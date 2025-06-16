export * from "./auth";
export * from "./bookreader";
export * from "./gifcities";
export * from "./favorites";
export * from "./metadata";
export * from "./related";
export * from "./reviews";
export * from "./search";
export * from "./searchtext";
export * from "./s3";
export * from "./views";
export * from "./wayback";
export * from "./zip";

import { Auth } from "./auth";
import { BookReaderAPI } from "./bookreader";
import { GifcitiesAPI } from "./gifcities";
import { FavoritesAPI } from "./favorites";
import { MetadataAPI } from "./metadata";
import { RelatedAPI } from "./related";
import { ReviewsAPI } from "./reviews";
import { SearchAPI } from "./search";
import { SearchTextAPI } from "./searchtext";
import { S3API } from "./s3";
import { ViewsAPI } from "./views";
import { WaybackAPI } from "./wayback";
import { ZipFileAPI } from "./zip";

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
  S3API: new S3API(),
  ViewsAPI: new ViewsAPI(),
  WaybackAPI: new WaybackAPI(),
  ZipFileAPI: new ZipFileAPI(),
};

export default ia;
