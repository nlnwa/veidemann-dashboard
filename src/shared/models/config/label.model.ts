import {Label as LabelProto} from '../../../api';


export class Label {
  key: string;
  value: string;

  constructor({key = '', value = ''}: Partial<Label> = {}) {
    this.key = key;
    this.value = value;
  }

  static fromProto(proto: LabelProto): Label {
    return new Label({
      key: proto.getKey(),
      value: proto.getValue()
    });
  }

  static toProto(label: Label): LabelProto {
    const proto = new LabelProto();
    proto.setKey(label.key);
    proto.setValue(label.value);
    return proto;
  }
}
