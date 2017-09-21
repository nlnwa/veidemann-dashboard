import {Label} from './label';

export class Meta {
  name: string;
  description: string;
  created?: Time;
  created_by?: string;
  last_modified?: Time;
  last_modified_by?: string;
  label: Label[];
}

export class Time {
  seconds?: number;
  nanos?: number;
}
