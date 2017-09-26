import {Meta} from '../../commons/models/meta.model';
import {Timestamp} from '../../commons/models/timestamp.model';

export class Schedule {
  id?: string;
  meta: Meta;
  cron_expression: string;
  valid_from?: Timestamp;
  valid_to?: Timestamp;
}
