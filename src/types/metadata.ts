export interface MetadataAPIBaseFile {
  name: string;
  source: "original" | "metadata" | "derivative";
  /* Timestamp in seconds when the file was uploaded */
  mtime: string;
  /** Bytes */
  size: string;
  md5: string;
  crc32?: string;
  sha1?: string;
  format: string;
  viruscheck?: string;
  summation?: string;
  /** Unsure, video duration seems to actually be `length` */
  duration?: string;
  /** Video runtime in seconds, as a float */
  length?: string;
  /** Media files only (images/videos) */
  width?: string;
  /** Media files only (images/videos) */
  height?: string;
}

export type MetadataAPIOriginalFile = MetadataAPIBaseFile & {
  source: "original";
};

export type MetadataAPIMetadataFile = MetadataAPIBaseFile & {
  source: "metadata";
};

export type MetadataAPIDerivativeFile = MetadataAPIBaseFile & {
  source: "derivative";
  original: string;
};

export type MetadataAPIFile =
  | MetadataAPIOriginalFile
  | MetadataAPIMetadataFile
  | MetadataAPIDerivativeFile;

export interface MetadataAPIReview {
  reviewtitle: string;
  reviewbody: string;
  stars: `${0 | 1 | 2 | 3 | 4 | 5}`;
  /** Display name for the user */
  reviewer: string;
  reviewdate: string;
  createdate: string;
  /**
   * `@`-prefixed handle for the user (accessible at /metadata or
   * /details like any other item)
   */
  reviewer_itemname: string;
}

export interface MetadataAPIItem {
  alternate_locations: {
    servers: { server: string; dir: string }[];
    workable: { server: string; dir: string }[];
  };
  /**
   * Not a timestamp, see `metadata.publicdate` or
   * `metadata.addeddate` instead.
   */
  created: number;
  d1: string;
  d2: string;
  dir: string;
  files: MetadataAPIFile[];
  files_count: number;
  /** Timestamp in seconds */
  item_last_updated: number;
  /** Bytes */
  item_size: number;
  metadata: {
    identifier: string;
    "external-identifier"?: string;
    mediatype: string;
    country?: string[];
    date?: string;
    description: string;
    director?: string;
    actor?: string[];
    creator?: string | string[];
    distributor?: string[];
    format?: string;
    genre?: string[];
    language: string;
    "music-by"?: string;
    /** if string, semicolon-separated */
    subject: string | string[];
    title: string;
    "written-by"?: string[];
    year?: string;
    /** Usually an e-mail address(?) */
    uploader: string;
    publicdate: string;
    addeddate: string;
    curation: string;
    sound: string;
    color: string;
    collection: string[];
    rights: string;
  };
  reviews: MetadataAPIReview[];
  server: string;
  /** A unique(?) pseudo-random ID for the item */
  uniq: number;
  workable_servers: string[];
}
