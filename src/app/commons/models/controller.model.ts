import {Selector} from './config.model';

export interface ListReply<T extends ListRequest> {
  value: T[];
  count: number;
  page_size: string;
  page: string;
}

export interface ListRequest {
  id?: string;
  name?: string;
  crawl_job_id?: string;
  selector?: Selector;
  entity_id?: string;

  expand?: boolean;

  page_size?: number;
  page?: number;
}

export interface RunCrawlReply {
  seed_execution_id: string[];
}
