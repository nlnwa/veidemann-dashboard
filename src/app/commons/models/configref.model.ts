import {ConfigRef as ConfigRefProto} from '../../../api/config/v1/config_pb';
import {Kind} from './kind.model';

export class ConfigRef {
  kind: Kind;
  id: string;

  constructor({kind = Kind.UNDEFINED, id = ''} = {}) {
    this.id = id;
    this.kind = kind;
  }

  static fromProto(proto: ConfigRefProto): ConfigRef {
    return new ConfigRef({
      id: proto.getId(),
      kind: proto.getKind().valueOf()
    });
  }

  toProto(): ConfigRefProto {
    const proto = new ConfigRefProto();
    proto.setId(this.id);
    proto.setKind(this.kind.valueOf());
    return proto;
  }
}
