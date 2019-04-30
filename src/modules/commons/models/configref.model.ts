import {ConfigRefProto} from '../../../api';
import {Kind} from './kind.model';

export class ConfigRef {
  kind: Kind;
  id: string;

  constructor(configRef: Partial<ConfigRef>) {
    this.id = configRef.id || '';
    this.kind = configRef.kind || Kind.UNDEFINED;
  }

  static fromProto(proto: ConfigRefProto): ConfigRef {
    return new ConfigRef({
      id: proto.getId(),
      kind: proto.getKind().valueOf()
    });
  }

  static toProto(configRef: ConfigRef): ConfigRefProto {
    if (!configRef) {
      return undefined;
    }
    const proto = new ConfigRefProto();
    proto.setId(configRef.id);
    proto.setKind(configRef.kind.valueOf());
    return proto;
  }
}
