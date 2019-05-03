import {CollectionProto} from '../../../../api';


export enum SubCollectionType {
  UNDEFINED = 0,
  SCREENSHOT = 1,
  DNS = 2,
}

export class SubCollection {
  type: SubCollectionType;
  name: string;

  constructor({
    type = SubCollectionType.UNDEFINED,
    name = ''
              }: Partial<SubCollection> = {}) {
    this.type = type;
    this.name = name;
  }

  static fromProto(proto: CollectionProto.SubCollection): SubCollection {
    return new SubCollection({
      type: proto.getType(),
      name: proto.getName()
    });
  }

  static toProto(subCollection: SubCollection): CollectionProto.SubCollection {
    const proto = new CollectionProto.SubCollection();
    proto.setType(subCollection.type);
    proto.setName(subCollection.name);
    return proto;
  }
}
