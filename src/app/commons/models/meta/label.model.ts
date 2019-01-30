import {Label as LabelProto} from '../../../../api/config/v1/config_pb';

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
    const proto = new LabelProto() as any as LabelProto.AsObject;
    proto.key = this.key;
    proto.value = this.value;

    return proto as any as LabelProto;
  }
}
