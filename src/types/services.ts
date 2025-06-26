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
