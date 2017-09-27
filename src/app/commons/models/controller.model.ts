export interface ListReply<T extends ListRequest> {
  value: T[];
  count: number;
  page_size: string;
  page: string;
}

export interface ListRequest {
  id?: string;
  page_size?: number;
  page?: number;
}
