import {Label} from "./label";
/**
 * Created by kristiana on 27.06.17.
 */

export class Meta {
  name: string;
  description: string;
  created?: Created;
  created_by?: string;
  last_modified?: Last_modified;
  last_modified_by?: string;
  label: Label[];
}
export class Last_modified {
  seconds: number;
  nanos: number;
}

export class Created {
  seconds: number;
  nanos: number;
}
