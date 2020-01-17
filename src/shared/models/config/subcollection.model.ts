import {Collection as CollectionProto} from '../../../api';
import {isNumeric} from '../../func';


export enum SubCollectionType {
  UNDEFINED = 0,
  SCREENSHOT = 1,
  DNS = 2,
}

export const subCollectionTypes = Object.keys(SubCollectionType).filter(p => !isNumeric(p)).map(key => SubCollectionType[key]);

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
