import {CollectionProto} from '../../../../api';
import {SubCollection, SubCollectionType} from './subcollection.model';

export enum RotationPolicy {
  NONE = 0,
  HOURLY = 1,
  DAILY = 2,
  MONTHLY = 3,
  YEARLY = 4,
}

export class Collection {
  collectionDedupPolicy: RotationPolicy;
  fileRotationPolicy: RotationPolicy;
  compress: boolean;
  fileSize: number;
  subCollectionsList: SubCollection[];

  constructor({
                collectionDedupPolicy = RotationPolicy[RotationPolicy.NONE] as any as RotationPolicy,
                fileRotationPolicy = RotationPolicy[RotationPolicy.NONE] as any as RotationPolicy,
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
      collectionDedupPolicy: RotationPolicy[proto.getCollectionDedupPolicy()] as any as RotationPolicy,
      fileRotationPolicy: RotationPolicy[proto.getFileRotationPolicy()] as any as RotationPolicy,
      compress: proto.getCompress(),
      fileSize: proto.getFileSize(),
      subCollectionsList: proto.getSubCollectionsList()
        .map(subCollectionProto => new SubCollection(
          {
            name: subCollectionProto.getName(),
            type: SubCollectionType[subCollectionProto.getType()] as any as SubCollectionType
          }))
    });
  }

  static toProto(collection: Collection): CollectionProto {
    const proto = new CollectionProto();
    proto.setCollectionDedupPolicy(CollectionProto.RotationPolicy[collection.collectionDedupPolicy] as any as CollectionProto.RotationPolicy);
    proto.setFileRotationPolicy(CollectionProto.RotationPolicy[collection.fileRotationPolicy] as any as CollectionProto.RotationPolicy);
    proto.setCompress(collection.compress);
    proto.setFileSize(collection.fileSize);
    proto.setSubCollectionsList(collection.subCollectionsList.map(subCollection => SubCollection.toProto(subCollection)));
    return proto;
  }
}

