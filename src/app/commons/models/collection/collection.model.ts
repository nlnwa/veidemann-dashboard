import {Collection as CollectionProto} from 'veidemann-api-grpc-web';


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
    const proto = new CollectionProto();
    proto.setCollectionDedupPolicy(this.collectionDedupPolicy);
    proto.setFileRotationPolicy(this.fileRotationPolicy);
    proto.setCompress(this.compress);
    proto.setFileSize(this.fileSize);
    proto.setSubCollectionsList(this.subCollectionsList.map(ref => ref.toProto()));
    return proto;
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

  static fromProto(proto: CollectionProto.SubCollection): SubCollection {
    return new SubCollection({
      type: proto.getType(),
      name: proto.getName()
    });
  }

  toProto(): CollectionProto.SubCollection {
    const proto = new CollectionProto.SubCollection();
    proto.setType(this.type);
    proto.setName(this.name);
    return proto;
  }
}
