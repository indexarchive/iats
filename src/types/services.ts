import type { MetadataAPIItemMetadata } from "./metadata";

export interface ServicesAPIUserListItem {
  identifier: string;
  /** incremental ID, only unique per-list */
  member_id: number;
  date_added: string;
}

export interface ServicesAPIUserList {
  list_name: string;
  /** may be an empty string */
  description: string;
  is_private: boolean;
  /** incremental ID, only unique per-account */
  id: number;
  date_created: string;
  date_updated: string;
  members: ServicesAPIUserListItem[];
}

export type ServicesAPIUserListWithItem = ServicesAPIUserList & {
  members: (ServicesAPIUserListItem & {
    /** whether the queried identifier is a member */
    item_is_member: boolean;
    /**
     * if the queried identifier is a member, this is its ID within the list.
     * if the item is found multiple times, this is the ID of the newest such
     * member.
     */
    member_id?: number;
  })[];
};

export interface ServicesAPIResponse<T> {
  success: true;
  value: T;
}

export type ServicesAPIGetUserListsResponse = ServicesAPIResponse<
  ServicesAPIUserList[]
>;

export type ServicesAPIGetUserListsWithItemResponse = ServicesAPIResponse<
  ServicesAPIUserListWithItem[]
>;

export type ServicesAPIGetUserListResponse =
  ServicesAPIResponse<ServicesAPIUserList>;

export enum ServicesAPISearchHitType {
  Item = "item",
  // `ou` alias?
  FavoritedSearch = "favorited_search",
}

export enum ServicesAPISearchBackend {
  Metadata = "metadata",
  Lists = "lists_api",
}

export interface ServicesAPISearchHitBase {
  index: string;
  service_backend: ServicesAPISearchBackend;
  hit_type: ServicesAPISearchHitType;
}

export interface ServicesAPISearchHitMetadata extends ServicesAPISearchHitBase {
  service_backend: ServicesAPISearchBackend.Metadata;
  hit_type: ServicesAPISearchHitType.Item;
  fields: Pick<
    MetadataAPIItemMetadata,
    | "identifier"
    | "creator"
    | "collection"
    | "date"
    | "year"
    | "language"
    | "mediatype"
    | "addeddate"
  > & {
    /** bytes; computed during document construction */
    item_size: number;
    file_count: number;
    /** computed during document construction */
    num_favorites?: number;
    /** computed during document construction */
    num_reviews?: number;
    /** total views over item lifetime, updated by audit consultation with Views API  */
    downloads?: number;
    /** views over a seven-day period, updated by audit consultation with Views API  */
    week?: number;
    /** views over a month, updated by audit consultation with Views API  */
    month?: number;
    /**
     * item characterization including noindex status.
     * schema lists this as a string but it has been received as a string array.
     */
    indexflag: string | string[];
    avg_rating?: number;
    reviewdate?: string;
    /** not metadata; only present in favorites lists, sourced from Lists API */
    date_favorited?: string;
    publicdate?: string;

    // below this point are from the schema rather than having been observed
    /** computed during document construction */
    item_count?: number;
    /** computed during document construction, may be inferred from item_count */
    displayed_item_count?: number;
    /**
     * This is listed in the schema as non-optional but in real
     * payloads, `file_count` appears instead.
     */
    files_count?: number;
    noindex?: boolean;
    title?: string;
    /** Max length 1000 */
    description?: string;
    /** Max length 1000 */
    subject?: string;
    genre?: string;
    volume?: string;
    type?: string;
    licenseurl?: string;
    /** computed during document construction, for collection items only  */
    collection_files_count?: number;
    /** bytes; computed during document construction, for collection items only  */
    collection_size?: number;

    /** may be stale */
    lending___available_to_borrow?: boolean;
    /** may be stale */
    lending___available_to_browse?: boolean;
    /** may be stale */
    lending___available_to_waitlist?: boolean;
    /** may be stale */
    lending___status?: string;

    addeddate?: string;
    /** format varies */
    issue?: string;
    /** format varies */
    source?: string;
    /** untruncated JSON encoded data used for Account reviews */
    reviews_data?: string;
  };
  highlight: null;
  _score: null;
}

export interface ServicesAPISearchHitFavoritedSearch
  extends ServicesAPISearchHitBase {
  service_backend: ServicesAPISearchBackend.Lists;
  hit_type: ServicesAPISearchHitType.FavoritedSearch;
  fields: {
    query: string;
    title?: string;
    /** not metadata; only present in favorites lists, sourced from Lists API */
    date_favorited?: string;
    /** synthesized in annotation of raw hits; TBD */
    __href__?: string;
  };
}

export type ServicesAPICollectionExtraInfo = Pick<
  ServicesAPISearchHitMetadata["fields"],
  | "item_size"
  | "month"
  | "week"
  | "downloads"
  | "reviews_data"
  | "item_count"
  | "collection_size"
  | "collection_files_count"
> & {
  num_favorites: number | null;
  title_message: string | null;
  primary_collection: string | null;
  thumbnail_url: string | false;
  has_items_with_searchable_text: boolean;
  forum_identifier: string;
  forum_count: number;
  review_count: number;
  uploader_details: {
    screen_name: string;
    /** @-prefixed user itemname */
    useritem: string;
    is_archivist: boolean;
  };
  contributor_details: unknown[];
  public_metadata: {
    identifier: string;
    description: string;
    hidden: `${boolean}`;
    mediatype: string;
    sort_order: string;
    subject: string | string[];
    title: string;
    publicdate: string;
    addeddate: string;
  };
  reviews_metadata: unknown[];
};

export type ServicesAPISearchHit =
  | ServicesAPISearchHitMetadata
  | ServicesAPISearchHitFavoritedSearch;

export interface ServicesAPIBetaSearchBody {
  hits: {
    total: number;
    returned: number;
    hits: ServicesAPISearchHit[];
  };
  /** If searching a collection */
  collection_extra_info?: ServicesAPICollectionExtraInfo;
  collection_titles: Record<string, string>;
}

export interface ServicesAPIGetBetaSearch {
  uid?: string;
  version: string;
  session_context: unknown;
  request: unknown;
  caching: unknown;
  elapsed_secs: number;
  response: {
    header: unknown;
    body: ServicesAPIBetaSearchBody;
    hit_schema: Record<ServicesAPISearchHitType, unknown> | [];
  };
}
