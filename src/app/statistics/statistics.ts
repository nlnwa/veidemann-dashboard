/**
 * Created by kristiana on 11.05.17.
 */

export class Seeds {
  value: Value[];
  count: '';
  page_size: '';
  page: '';
}

export class Value {
  id?: string;
  meta: Meta;
  entity_id: '';
  uri: '';
  scope: '';
  job_id: '';
}

export class Meta {
  name: '';
  description: '';
  created: '';
  created_by: '';
  last_modified: '';
  last_modified_by: '';
  labels: Label[];
}

export class Label {
  key: '';
  value = '';
}
