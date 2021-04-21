import * as jspb from 'google-protobuf'

import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class CrawlLog extends jspb.Message {
  getWarcId(): string;
  setWarcId(value: string): CrawlLog;

  getTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): CrawlLog;
  hasTimeStamp(): boolean;
  clearTimeStamp(): CrawlLog;

  getStatusCode(): number;
  setStatusCode(value: number): CrawlLog;

  getSize(): number;
  setSize(value: number): CrawlLog;

  getRequestedUri(): string;
  setRequestedUri(value: string): CrawlLog;

  getResponseUri(): string;
  setResponseUri(value: string): CrawlLog;

  getDiscoveryPath(): string;
  setDiscoveryPath(value: string): CrawlLog;

  getReferrer(): string;
  setReferrer(value: string): CrawlLog;

  getContentType(): string;
  setContentType(value: string): CrawlLog;

  getFetchTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFetchTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): CrawlLog;
  hasFetchTimeStamp(): boolean;
  clearFetchTimeStamp(): CrawlLog;

  getFetchTimeMs(): number;
  setFetchTimeMs(value: number): CrawlLog;

  getBlockDigest(): string;
  setBlockDigest(value: string): CrawlLog;

  getPayloadDigest(): string;
  setPayloadDigest(value: string): CrawlLog;

  getStorageRef(): string;
  setStorageRef(value: string): CrawlLog;

  getRecordType(): string;
  setRecordType(value: string): CrawlLog;

  getWarcRefersTo(): string;
  setWarcRefersTo(value: string): CrawlLog;

  getIpAddress(): string;
  setIpAddress(value: string): CrawlLog;

  getExecutionId(): string;
  setExecutionId(value: string): CrawlLog;

  getRetries(): number;
  setRetries(value: number): CrawlLog;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): CrawlLog;
  hasError(): boolean;
  clearError(): CrawlLog;

  getJobExecutionId(): string;
  setJobExecutionId(value: string): CrawlLog;

  getCollectionFinalName(): string;
  setCollectionFinalName(value: string): CrawlLog;

  getMethod(): string;
  setMethod(value: string): CrawlLog;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlLog.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlLog): CrawlLog.AsObject;
  static serializeBinaryToWriter(message: CrawlLog, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlLog;
  static deserializeBinaryFromReader(message: CrawlLog, reader: jspb.BinaryReader): CrawlLog;
}

export namespace CrawlLog {
  export type AsObject = {
    warcId: string,
    timeStamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    statusCode: number,
    size: number,
    requestedUri: string,
    responseUri: string,
    discoveryPath: string,
    referrer: string,
    contentType: string,
    fetchTimeStamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    fetchTimeMs: number,
    blockDigest: string,
    payloadDigest: string,
    storageRef: string,
    recordType: string,
    warcRefersTo: string,
    ipAddress: string,
    executionId: string,
    retries: number,
    error?: commons_v1_resources_pb.Error.AsObject,
    jobExecutionId: string,
    collectionFinalName: string,
    method: string,
  }
}

export class PageLog extends jspb.Message {
  getWarcId(): string;
  setWarcId(value: string): PageLog;

  getUri(): string;
  setUri(value: string): PageLog;

  getExecutionId(): string;
  setExecutionId(value: string): PageLog;

  getReferrer(): string;
  setReferrer(value: string): PageLog;

  getJobExecutionId(): string;
  setJobExecutionId(value: string): PageLog;

  getCollectionFinalName(): string;
  setCollectionFinalName(value: string): PageLog;

  getMethod(): string;
  setMethod(value: string): PageLog;

  getResourceList(): Array<PageLog.Resource>;
  setResourceList(value: Array<PageLog.Resource>): PageLog;
  clearResourceList(): PageLog;
  addResource(value?: PageLog.Resource, index?: number): PageLog.Resource;

  getOutlinkList(): Array<string>;
  setOutlinkList(value: Array<string>): PageLog;
  clearOutlinkList(): PageLog;
  addOutlink(value: string, index?: number): PageLog;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PageLog.AsObject;
  static toObject(includeInstance: boolean, msg: PageLog): PageLog.AsObject;
  static serializeBinaryToWriter(message: PageLog, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PageLog;
  static deserializeBinaryFromReader(message: PageLog, reader: jspb.BinaryReader): PageLog;
}

export namespace PageLog {
  export type AsObject = {
    warcId: string,
    uri: string,
    executionId: string,
    referrer: string,
    jobExecutionId: string,
    collectionFinalName: string,
    method: string,
    resourceList: Array<PageLog.Resource.AsObject>,
    outlinkList: Array<string>,
  }

  export class Resource extends jspb.Message {
    getUri(): string;
    setUri(value: string): Resource;

    getFromCache(): boolean;
    setFromCache(value: boolean): Resource;

    getRenderable(): boolean;
    setRenderable(value: boolean): Resource;

    getResourceType(): string;
    setResourceType(value: string): Resource;

    getContentType(): string;
    setContentType(value: string): Resource;

    getStatusCode(): number;
    setStatusCode(value: number): Resource;

    getDiscoveryPath(): string;
    setDiscoveryPath(value: string): Resource;

    getWarcId(): string;
    setWarcId(value: string): Resource;

    getReferrer(): string;
    setReferrer(value: string): Resource;

    getError(): commons_v1_resources_pb.Error | undefined;
    setError(value?: commons_v1_resources_pb.Error): Resource;
    hasError(): boolean;
    clearError(): Resource;

    getMethod(): string;
    setMethod(value: string): Resource;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Resource.AsObject;
    static toObject(includeInstance: boolean, msg: Resource): Resource.AsObject;
    static serializeBinaryToWriter(message: Resource, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Resource;
    static deserializeBinaryFromReader(message: Resource, reader: jspb.BinaryReader): Resource;
  }

  export namespace Resource {
    export type AsObject = {
      uri: string,
      fromCache: boolean,
      renderable: boolean,
      resourceType: string,
      contentType: string,
      statusCode: number,
      discoveryPath: string,
      warcId: string,
      referrer: string,
      error?: commons_v1_resources_pb.Error.AsObject,
      method: string,
    }
  }

}

