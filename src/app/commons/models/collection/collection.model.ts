import {
  Collection as CollectionProto,
  SubCollection as SubCollectionProto
} from '../../../../api/config/v1/config_pb';

export enum RotationPolicy {
  NONE = 0,
  HOURLY = 1,
  DAILY = 2,
  MONTHLY = 3,
  YEARLY = 4,
}

export enum SubCollectionType {
  UNDEFINED = 0,
  SCREENSHOT = 1,
  DNS = 2,
}


export class Collection {
  collectionDedupPolicy: RotationPolicy;
  fileRotationPolicy: RotationPolicy;
  compress: boolean;
  fileSize: number;
  subCollectionsList: SubCollection[];

  constructor({
                collectionDedupPolicy = RotationPolicy.NONE,
                fileRotationPolicy = RotationPolicy.NONE,
                compress = false,
                fileSize = 0,
                subCollectionsList = []
              } = {}) {
    this.collectionDedupPolicy = collectionDedupPolicy;
    this.fileRotationPolicy = fileRotationPolicy;
    this.compress = compress;
    this.fileSize = fileSize;
    this.subCollectionsList = subCollectionsList;
  }

  static fromProto(proto: CollectionProto): Collection {
    return new Collection({
      collectionDedupPolicy: proto.getCollectionDedupPolicy(),
      fileRotationPolicy: proto.getFileRotationPolicy(),
      compress: proto.getCompress(),
      fileSize: proto.getFileSize(),
      subCollectionsList: proto.getSubCollectionsList()
    });
  }

  toProto(): CollectionProto {
    const proto = new CollectionProto() as any as CollectionProto.AsObject;
    proto.collectionDedupPolicy = this.collectionDedupPolicy;
    proto.fileRotationPolicy = this.fileRotationPolicy;
    proto.compress = this.compress;
    proto.fileSize = this.fileSize;
    proto.subCollectionsList = this.subCollectionsList.map(ref => ref.toProto());
    return proto as any as CollectionProto;
  }
}


export class SubCollection {
  type: SubCollectionType;
  name: string;

  constructor({
                type = SubCollectionType.UNDEFINED,
                name = ''
              } = {}) {
    this.type = type;
    this.name = name;
  }

  static fromProto(proto: SubCollectionProto): SubCollection {
    return new SubCollection({
      type: proto.getType(),
      name: proto.getName()
    });
  }

  toProto(): SubCollectionProto {
    const proto = new SubCollectionProto() as any as SubCollectionProto.AsObject;
    proto.type = this.type;
    proto.name = this.name;
    return proto as any as SubCollectionProto;
  }
}
