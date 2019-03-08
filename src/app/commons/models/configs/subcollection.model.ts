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
                type = SubCollectionType[SubCollectionType.UNDEFINED] as any as SubCollectionType,
                name = ''
              } = {}) {
    this.type = type;
    this.name = name;
  }

  static fromProto(proto: CollectionProto.SubCollection): SubCollection {
    return new SubCollection({
      type: SubCollectionType[proto.getType()] as any as SubCollectionType,
      name: proto.getName()
    });
  }

  static toProto(subCollection: SubCollection): CollectionProto.SubCollection {
    const proto = new CollectionProto.SubCollection();
    proto.setType(CollectionProto.SubCollectionType[subCollection.type] as any as SubCollectionType);
    proto.setName(subCollection.name);
    return proto;
  }
}
