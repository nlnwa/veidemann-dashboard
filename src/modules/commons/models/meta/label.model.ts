import {LabelProto} from '../../../../api';


export class Label {
  key?: string;
  value?: string;

  constructor(label?: Partial<Label> ) {
    this.key = label.key || '';
    this.value = label.value || '';
  }

  static fromProto(proto: LabelProto): Label {
    return new Label({
      key: proto.getKey(),
      value: proto.getValue()
    });
  }

  toProto(): LabelProto {
    const proto = new LabelProto();
    proto.setKey(this.key);
    proto.setValue(this.value);
    return proto;
  }
}
