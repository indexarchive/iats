export interface SearchAPIItem {
  avg_rating: string;
  backup_location: string;
  btih: string;
  call_number: string;
  collection: string;
  contributor: string;
  coverage: string;
  creator?: string | string[];
  date?: string;
  description: string;
  downloads: string | number;
  "external-identifier"?: string;
  foldoutcount: string;
  format: string[];
  genre: string;
  identifier: string;
  imagecount: string;
  indexflag: string;
  item_size: string | number;
  language: string;
  licenseurl: string;
  mediatype: string;
  members: string;
  name?: string;
  noindex: string;
  num_reviews: string;
  oai_updatedate: string;
  publicdate: string;
  publisher: string;
  "related-external-id"?: string;
  reviewdate: string;
  rights: string;
  scanningcentre: string;
  source: string;
  stripped_tags: string;
  /** if string, semicolon-separated */
  subject: string | string[];
  title: string;
  type: string;
  volume: string;
  week: string | number;
  month: string | number;
  year?: number;
}

export type SearchAPIGetQuery = Record<string, unknown> | string;

export interface SearchAPIGetResponseParams {
  /** The query passed to `q`, URL-decoded and parsed/expanded by the server */
  query: string;
  /** The raw un-decoded query passed to `q` */
  qin: string;
  /** Comma-separated list of requested fields */
  fields: string;
  /** Requested output format */
  wt: "json";
  /** Total requested rows */
  rows: number;
  /** Requested start index */
  start: number;
}

export interface SearchAPIGetResult<T extends keyof SearchAPIItem> {
  responseHeader: {
    /** Should usually be 0 for a successful search */
    status: number;
    QTime: number;
    params: SearchAPIGetResponseParams;
  };
  response: {
    /** Total number of results found */
    numFound: number;
    /**
     * The index of all results that `docs` starts at (should mirror your
     * input `start` param or default to 0)
     */
    start: number;
    /** Resultant items for your query, may be an empty list */
    docs: Pick<SearchAPIItem, T>[];
  };
}
