import {Label as LabelProto} from 'veidemann-api-grpc-web';

export class Label {
  key?: string;
  value?: string;

  constructor({
                key = '',
                value = ''
              } = {}) {
    this.key = key;
    this.value = value;
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
