/**
 * Created by kristiana on 18.05.17.
 */

export class Schedules {
  //value: Value[];
  count: number;
  page_size: string;
  page: string;
}

export class Schedule {
  id?: string;
  meta: Meta;
  cron_expression: string;
  valid_from?: Valid_from;
  valid_to?: Valid_to;
}

export class Valid_from {
  seconds: number;
  nanos?: number;
}

export class Valid_to {
  seconds: number;
  nanos?: number;
}

export class Meta {
  name: string;
  description: string;
  created?: string;
  created_by?: string;
  last_modified?: string;
  last_modified_by?: string;
  labels?: Label[];
}

export class Label {
  key: string;
  value: string;
}
