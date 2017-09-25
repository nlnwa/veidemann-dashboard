import {Meta} from '../../commons/models/meta.model';

export class Schedules {
  value: Schedule[];
  count: number;
  page_size: string;
  page: string;
}

export class Schedule {
  id?: string;
  meta: Meta;
  cron_expression: string;
  valid_from?: ValidFrom;
  valid_to?: ValidTo;
}

export class ValidFrom {
  seconds: number;
  nanos?: number;
}

export class ValidTo {
  seconds: number;
  nanos?: number;
}
