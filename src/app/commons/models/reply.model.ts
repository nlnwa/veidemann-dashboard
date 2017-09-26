import {ListRequest} from './request.model';

export interface ListReply<T extends ListRequest> {
  value: T[];
  count: number;
  page_size: string;
  page: string;
}
