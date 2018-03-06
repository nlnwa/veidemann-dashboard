export interface ListReply<T extends ListRequest> {
  value: T[];
  count: string;
  page_size: number;
  page: number;
}

export interface ListRequest {
  id?: string;
  name?: string;
  label_selector?: string[];
  page_size?: number;
  page?: number;

  crawl_job_id?: string;
  entity_id?: string;
}

export interface RunCrawlReply {
  seed_execution_id: string[];
}
