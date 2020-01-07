import {ConfigRefProto} from '../../../../api';
import {Kind} from './kind.model';

export class ConfigRef {
  kind: Kind;
  id: string;

  constructor({
                kind = Kind.UNDEFINED,
                id = ''
              }: Partial<ConfigRef> = {}) {
    this.id = id;
    this.kind = kind;
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
