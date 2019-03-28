import {EventObjectProto} from '../../../../api';
import {Label} from '../meta/label.model';
import {fromTimestampProto, intersectLabel} from '../../func';

export enum State {
  NEW = 0,
  OPEN = 1,
  CLOSED = 2
}

export enum Severity {
  INFO = 0,
  WARN = 1,
  ERROR = 2
}

export enum ChangeType {
  CREATED = 0,
  VALUE_CHANGED = 1,
  ARRAY_ADD = 2,
  ARRAY_DEL = 3
}


export class EventObject {
  id?: string;
  type?: string;
  source?: string;
  state: State;
  assignee?: string;
  activityList: Activity[];
  dataList: Data[];
  severity: Severity;
  labelList?: Label[];

  constructor(eventObject: EventObject | any = {}) {
    this.id = eventObject.id || '';
    this.type = eventObject.type || '';
    this.source = eventObject.source || '';
    this.state = eventObject.state;
    this.assignee = eventObject.assignee || '';
    this.activityList = eventObject.activityList || [];
    this.dataList = eventObject.dataList || [];
    this.severity = eventObject.severity;
    this.labelList = eventObject.labelList || [];
  }

  static fromProto(proto: EventObjectProto): EventObject {
    return new EventObject({
      id: proto.getId(),
      type: proto.getType(),
      source: proto.getSource(),
      state: State[proto.getState()] as any as State,
      assignee: proto.getAssignee(),
      activityList: proto.getActivityList().map(activity => new Activity({
        modifiedTime: fromTimestampProto(activity.getModifiedTime()),
        modifiedBy: activity.getModifiedBy(),
        description: activity.getDescriptionList().map(change => new Change({
          type: ChangeType[change.getType()] as any as ChangeType,
          field: change.getField(),
          oldVal: change.getOldVal(),
          newVal: change.getNewVal()
        })),
        comment: activity.getComment()
      })),
      dataList: proto.getDataList().map(data => new Data({key: data.getKey(), value: data.getValue()})),
      severity: Severity[proto.getSeverity()] as any as Severity,
      labelList: proto.getLabelList()
    });
  }

  static mergeEvents(eventObjects: EventObject[]): EventObject {
    const eventObject = new EventObject();
    const compareObj: EventObject = eventObjects[0];

    const equalAssignee = eventObjects.every(function (event) {
      return event.assignee === compareObj.assignee;
    });

    const label = eventObjects.reduce((acc: EventObject, curr: EventObject) => {
      eventObject.labelList = intersectLabel(acc.labelList, curr.labelList);
      return eventObject;
    });

    if (equalAssignee) {
      eventObject.assignee = compareObj.assignee;
    } else {
      eventObject.assignee = null;
    }
    return eventObject;
  }
}

export class Data {
  key?: string;
  value?: string;

  constructor({
                key = '',
                value = ''
              } = {}) {
    this.key = key;
    this.value = value;
  }
}

export class Change {
  type: ChangeType;
  field: string;
  oldVal: string;
  newVal: string;

  constructor({
                type =  ChangeType[ChangeType.CREATED] as any as ChangeType,
                field = '',
                oldVal = '',
                newVal = ''
              } = {}) {
    this.type = type;
    this.field = field;
    this.oldVal = oldVal;
    this.newVal = newVal;
  }
}

export class Activity {
  modiefiedBy?: string;
  modifiedTime?: string;
  description?: Change[];
  comment?: string;

  constructor({
                modifiedBy = '',
                modifiedTime = '',
                description = [],
                comment = '',
              } = {}) {
    this.modiefiedBy = modifiedBy;
    this.modifiedTime = modifiedTime;
    this.description = description;
    this.comment = comment;
  }
}

