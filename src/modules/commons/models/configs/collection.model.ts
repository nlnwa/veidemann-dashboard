import {CollectionProto} from '../../../../api';
import {SubCollection} from './subcollection.model';

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
                collectionDedupPolicy = RotationPolicy.NONE,
                fileRotationPolicy = RotationPolicy.NONE,
                compress = false,
                fileSize = 0,
                subCollectionsList = []
              }: Partial<Collection> = {}) {
    this.collectionDedupPolicy = collectionDedupPolicy;
    this.fileRotationPolicy = fileRotationPolicy;
    this.compress = compress;
    this.fileSize = fileSize;
    this.subCollectionsList = subCollectionsList ? subCollectionsList.map(subCollection => new SubCollection(subCollection)) : [];
  }

  static fromProto(proto: CollectionProto): Collection {
    return new Collection({
      collectionDedupPolicy: proto.getCollectionDedupPolicy(),
      fileRotationPolicy: proto.getFileRotationPolicy(),
      compress: proto.getCompress(),
      fileSize: proto.getFileSize(),
      subCollectionsList: proto.getSubCollectionsList().map(subCollectionProto => new SubCollection({
        name: subCollectionProto.getName(),
        type: subCollectionProto.getType()
      }))
    });
  }

  static toProto(collection: Collection): CollectionProto {
    const proto = new CollectionProto();
    proto.setCollectionDedupPolicy(collection.collectionDedupPolicy);
    proto.setFileRotationPolicy(collection.fileRotationPolicy);
    proto.setCompress(collection.compress);
    proto.setFileSize(collection.fileSize);
    proto.setSubCollectionsList(collection.subCollectionsList.map(subCollection => SubCollection.toProto(subCollection)));
    return proto;
  }
}

