import * as jspb from "google-protobuf"

import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as config_v1_resources_pb from '../../config/v1/resources_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class QueuedUri extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getExecutionId(): string;
  setExecutionId(value: string): void;

  getDiscoveredTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDiscoveredTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasDiscoveredTimeStamp(): boolean;
  clearDiscoveredTimeStamp(): void;

  getSequence(): number;
  setSequence(value: number): void;

  getUri(): string;
  setUri(value: string): void;

  getSurt(): string;
  setSurt(value: string): void;

  getIp(): string;
  setIp(value: string): void;

  getDiscoveryPath(): string;
  setDiscoveryPath(value: string): void;

  getReferrer(): string;
  setReferrer(value: string): void;

  getCookiesList(): Array<Cookie>;
  setCookiesList(value: Array<Cookie>): void;
  clearCookiesList(): void;
  addCookies(value?: Cookie, index?: number): Cookie;

  getPageFetchTimeMs(): number;
  setPageFetchTimeMs(value: number): void;

  getRetries(): number;
  setRetries(value: number): void;

  getEarliestFetchTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEarliestFetchTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasEarliestFetchTimeStamp(): boolean;
  clearEarliestFetchTimeStamp(): void;

  getCrawlHostGroupId(): string;
  setCrawlHostGroupId(value: string): void;

  getPolitenessRef(): config_v1_resources_pb.ConfigRef | undefined;
  setPolitenessRef(value?: config_v1_resources_pb.ConfigRef): void;
  hasPolitenessRef(): boolean;
  clearPolitenessRef(): void;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): void;
  hasError(): boolean;
  clearError(): void;

  getJobExecutionId(): string;
  setJobExecutionId(value: string): void;

  getUnresolved(): boolean;
  setUnresolved(value: boolean): void;

  getFetchStartTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFetchStartTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasFetchStartTimeStamp(): boolean;
  clearFetchStartTimeStamp(): void;

  getPriorityWeight(): number;
  setPriorityWeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueuedUri.AsObject;
  static toObject(includeInstance: boolean, msg: QueuedUri): QueuedUri.AsObject;
  static serializeBinaryToWriter(message: QueuedUri, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueuedUri;
  static deserializeBinaryFromReader(message: QueuedUri, reader: jspb.BinaryReader): QueuedUri;
}

export namespace QueuedUri {
  export type AsObject = {
    id: string,
    executionId: string,
    discoveredTimeStamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    sequence: number,
    uri: string,
    surt: string,
    ip: string,
    discoveryPath: string,
    referrer: string,
    cookiesList: Array<Cookie.AsObject>,
    pageFetchTimeMs: number,
    retries: number,
    earliestFetchTimeStamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    crawlHostGroupId: string,
    politenessRef?: config_v1_resources_pb.ConfigRef.AsObject,
    error?: commons_v1_resources_pb.Error.AsObject,
    jobExecutionId: string,
    unresolved: boolean,
    fetchStartTimeStamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    priorityWeight: number,
  }
}

export class Cookie extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  getDomain(): string;
  setDomain(value: string): void;

  getPath(): string;
  setPath(value: string): void;

  getExpires(): number;
  setExpires(value: number): void;

  getSize(): number;
  setSize(value: number): void;

  getHttpOnly(): boolean;
  setHttpOnly(value: boolean): void;

  getSecure(): boolean;
  setSecure(value: boolean): void;

  getSession(): boolean;
  setSession(value: boolean): void;

  getSameSite(): string;
  setSameSite(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Cookie.AsObject;
  static toObject(includeInstance: boolean, msg: Cookie): Cookie.AsObject;
  static serializeBinaryToWriter(message: Cookie, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Cookie;
  static deserializeBinaryFromReader(message: Cookie, reader: jspb.BinaryReader): Cookie;
}

export namespace Cookie {
  export type AsObject = {
    name: string,
    value: string,
    domain: string,
    path: string,
    expires: number,
    size: number,
    httpOnly: boolean,
    secure: boolean,
    session: boolean,
    sameSite: string,
  }
}

export class CrawlHostGroup extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getPolitenessId(): string;
  setPolitenessId(value: string): void;

  getNextFetchTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setNextFetchTime(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasNextFetchTime(): boolean;
  clearNextFetchTime(): void;

  getBusy(): boolean;
  setBusy(value: boolean): void;

  getQueuedUriCount(): number;
  setQueuedUriCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlHostGroup.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlHostGroup): CrawlHostGroup.AsObject;
  static serializeBinaryToWriter(message: CrawlHostGroup, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlHostGroup;
  static deserializeBinaryFromReader(message: CrawlHostGroup, reader: jspb.BinaryReader): CrawlHostGroup;
}

export namespace CrawlHostGroup {
  export type AsObject = {
    id: string,
    politenessId: string,
    nextFetchTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    busy: boolean,
    queuedUriCount: number,
  }
}

export class CrawlExecutionStatus extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getState(): CrawlExecutionStatus.State;
  setState(value: CrawlExecutionStatus.State): void;

  getJobId(): string;
  setJobId(value: string): void;

  getSeedId(): string;
  setSeedId(value: string): void;

  getScope(): config_v1_resources_pb.CrawlScope | undefined;
  setScope(value?: config_v1_resources_pb.CrawlScope): void;
  hasScope(): boolean;
  clearScope(): void;

  getStartTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTime(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasStartTime(): boolean;
  clearStartTime(): void;

  getEndTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEndTime(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasEndTime(): boolean;
  clearEndTime(): void;

  getDocumentsCrawled(): number;
  setDocumentsCrawled(value: number): void;

  getBytesCrawled(): number;
  setBytesCrawled(value: number): void;

  getUrisCrawled(): number;
  setUrisCrawled(value: number): void;

  getDocumentsFailed(): number;
  setDocumentsFailed(value: number): void;

  getDocumentsOutOfScope(): number;
  setDocumentsOutOfScope(value: number): void;

  getDocumentsRetried(): number;
  setDocumentsRetried(value: number): void;

  getDocumentsDenied(): number;
  setDocumentsDenied(value: number): void;

  getLastChangeTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setLastChangeTime(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasLastChangeTime(): boolean;
  clearLastChangeTime(): void;

  getCreatedTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedTime(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasCreatedTime(): boolean;
  clearCreatedTime(): void;

  getCurrentUriIdList(): Array<string>;
  setCurrentUriIdList(value: Array<string>): void;
  clearCurrentUriIdList(): void;
  addCurrentUriId(value: string, index?: number): void;

  getJobExecutionId(): string;
  setJobExecutionId(value: string): void;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): void;
  hasError(): boolean;
  clearError(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlExecutionStatus.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlExecutionStatus): CrawlExecutionStatus.AsObject;
  static serializeBinaryToWriter(message: CrawlExecutionStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlExecutionStatus;
  static deserializeBinaryFromReader(message: CrawlExecutionStatus, reader: jspb.BinaryReader): CrawlExecutionStatus;
}

export namespace CrawlExecutionStatus {
  export type AsObject = {
    id: string,
    state: CrawlExecutionStatus.State,
    jobId: string,
    seedId: string,
    scope?: config_v1_resources_pb.CrawlScope.AsObject,
    startTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    endTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    documentsCrawled: number,
    bytesCrawled: number,
    urisCrawled: number,
    documentsFailed: number,
    documentsOutOfScope: number,
    documentsRetried: number,
    documentsDenied: number,
    lastChangeTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    createdTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    currentUriIdList: Array<string>,
    jobExecutionId: string,
    error?: commons_v1_resources_pb.Error.AsObject,
  }

  export enum State { 
    UNDEFINED = 0,
    CREATED = 1,
    FETCHING = 2,
    SLEEPING = 3,
    FINISHED = 4,
    ABORTED_TIMEOUT = 5,
    ABORTED_SIZE = 6,
    ABORTED_MANUAL = 7,
    FAILED = 8,
    DIED = 9,
  }
}

export class CrawlExecutionStatusChange extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getState(): CrawlExecutionStatus.State;
  setState(value: CrawlExecutionStatus.State): void;

  getEndTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEndTime(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasEndTime(): boolean;
  clearEndTime(): void;

  getAddDocumentsCrawled(): number;
  setAddDocumentsCrawled(value: number): void;

  getAddBytesCrawled(): number;
  setAddBytesCrawled(value: number): void;

  getAddUrisCrawled(): number;
  setAddUrisCrawled(value: number): void;

  getAddDocumentsFailed(): number;
  setAddDocumentsFailed(value: number): void;

  getAddDocumentsOutOfScope(): number;
  setAddDocumentsOutOfScope(value: number): void;

  getAddDocumentsRetried(): number;
  setAddDocumentsRetried(value: number): void;

  getAddDocumentsDenied(): number;
  setAddDocumentsDenied(value: number): void;

  getAddCurrentUri(): QueuedUri | undefined;
  setAddCurrentUri(value?: QueuedUri): void;
  hasAddCurrentUri(): boolean;
  clearAddCurrentUri(): void;

  getDeleteCurrentUri(): QueuedUri | undefined;
  setDeleteCurrentUri(value?: QueuedUri): void;
  hasDeleteCurrentUri(): boolean;
  clearDeleteCurrentUri(): void;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): void;
  hasError(): boolean;
  clearError(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlExecutionStatusChange.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlExecutionStatusChange): CrawlExecutionStatusChange.AsObject;
  static serializeBinaryToWriter(message: CrawlExecutionStatusChange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlExecutionStatusChange;
  static deserializeBinaryFromReader(message: CrawlExecutionStatusChange, reader: jspb.BinaryReader): CrawlExecutionStatusChange;
}

export namespace CrawlExecutionStatusChange {
  export type AsObject = {
    id: string,
    state: CrawlExecutionStatus.State,
    endTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    addDocumentsCrawled: number,
    addBytesCrawled: number,
    addUrisCrawled: number,
    addDocumentsFailed: number,
    addDocumentsOutOfScope: number,
    addDocumentsRetried: number,
    addDocumentsDenied: number,
    addCurrentUri?: QueuedUri.AsObject,
    deleteCurrentUri?: QueuedUri.AsObject,
    error?: commons_v1_resources_pb.Error.AsObject,
  }
}

export class JobExecutionStatus extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getJobId(): string;
  setJobId(value: string): void;

  getState(): JobExecutionStatus.State;
  setState(value: JobExecutionStatus.State): void;

  getExecutionsStateMap(): jspb.Map<string, number>;
  clearExecutionsStateMap(): void;

  getStartTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTime(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasStartTime(): boolean;
  clearStartTime(): void;

  getEndTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEndTime(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasEndTime(): boolean;
  clearEndTime(): void;

  getDocumentsCrawled(): number;
  setDocumentsCrawled(value: number): void;

  getBytesCrawled(): number;
  setBytesCrawled(value: number): void;

  getUrisCrawled(): number;
  setUrisCrawled(value: number): void;

  getDocumentsFailed(): number;
  setDocumentsFailed(value: number): void;

  getDocumentsOutOfScope(): number;
  setDocumentsOutOfScope(value: number): void;

  getDocumentsRetried(): number;
  setDocumentsRetried(value: number): void;

  getDocumentsDenied(): number;
  setDocumentsDenied(value: number): void;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): void;
  hasError(): boolean;
  clearError(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JobExecutionStatus.AsObject;
  static toObject(includeInstance: boolean, msg: JobExecutionStatus): JobExecutionStatus.AsObject;
  static serializeBinaryToWriter(message: JobExecutionStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JobExecutionStatus;
  static deserializeBinaryFromReader(message: JobExecutionStatus, reader: jspb.BinaryReader): JobExecutionStatus;
}

export namespace JobExecutionStatus {
  export type AsObject = {
    id: string,
    jobId: string,
    state: JobExecutionStatus.State,
    executionsStateMap: Array<[string, number]>,
    startTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    endTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    documentsCrawled: number,
    bytesCrawled: number,
    urisCrawled: number,
    documentsFailed: number,
    documentsOutOfScope: number,
    documentsRetried: number,
    documentsDenied: number,
    error?: commons_v1_resources_pb.Error.AsObject,
  }

  export enum State { 
    UNDEFINED = 0,
    CREATED = 1,
    RUNNING = 2,
    FINISHED = 3,
    ABORTED_MANUAL = 4,
    FAILED = 5,
    DIED = 6,
  }
}

export class CrawlLog extends jspb.Message {
  getWarcId(): string;
  setWarcId(value: string): void;

  getTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasTimeStamp(): boolean;
  clearTimeStamp(): void;

  getSurt(): string;
  setSurt(value: string): void;

  getStatusCode(): number;
  setStatusCode(value: number): void;

  getSize(): number;
  setSize(value: number): void;

  getRequestedUri(): string;
  setRequestedUri(value: string): void;

  getResponseUri(): string;
  setResponseUri(value: string): void;

  getDiscoveryPath(): string;
  setDiscoveryPath(value: string): void;

  getReferrer(): string;
  setReferrer(value: string): void;

  getContentType(): string;
  setContentType(value: string): void;

  getFetchTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFetchTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasFetchTimeStamp(): boolean;
  clearFetchTimeStamp(): void;

  getFetchTimeMs(): number;
  setFetchTimeMs(value: number): void;

  getBlockDigest(): string;
  setBlockDigest(value: string): void;

  getPayloadDigest(): string;
  setPayloadDigest(value: string): void;

  getStorageRef(): string;
  setStorageRef(value: string): void;

  getRecordType(): string;
  setRecordType(value: string): void;

  getWarcRefersTo(): string;
  setWarcRefersTo(value: string): void;

  getIpAddress(): string;
  setIpAddress(value: string): void;

  getExecutionId(): string;
  setExecutionId(value: string): void;

  getRetries(): number;
  setRetries(value: number): void;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): void;
  hasError(): boolean;
  clearError(): void;

  getJobExecutionId(): string;
  setJobExecutionId(value: string): void;

  getCollectionFinalName(): string;
  setCollectionFinalName(value: string): void;

  getMethod(): string;
  setMethod(value: string): void;

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
    surt: string,
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
  setWarcId(value: string): void;

  getUri(): string;
  setUri(value: string): void;

  getExecutionId(): string;
  setExecutionId(value: string): void;

  getReferrer(): string;
  setReferrer(value: string): void;

  getJobExecutionId(): string;
  setJobExecutionId(value: string): void;

  getCollectionFinalName(): string;
  setCollectionFinalName(value: string): void;

  getMethod(): string;
  setMethod(value: string): void;

  getResourceList(): Array<PageLog.Resource>;
  setResourceList(value: Array<PageLog.Resource>): void;
  clearResourceList(): void;
  addResource(value?: PageLog.Resource, index?: number): PageLog.Resource;

  getOutlinkList(): Array<string>;
  setOutlinkList(value: Array<string>): void;
  clearOutlinkList(): void;
  addOutlink(value: string, index?: number): void;

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
    setUri(value: string): void;

    getFromCache(): boolean;
    setFromCache(value: boolean): void;

    getRenderable(): boolean;
    setRenderable(value: boolean): void;

    getResourceType(): string;
    setResourceType(value: string): void;

    getMimeType(): string;
    setMimeType(value: string): void;

    getStatusCode(): number;
    setStatusCode(value: number): void;

    getDiscoveryPath(): string;
    setDiscoveryPath(value: string): void;

    getWarcId(): string;
    setWarcId(value: string): void;

    getReferrer(): string;
    setReferrer(value: string): void;

    getError(): commons_v1_resources_pb.Error | undefined;
    setError(value?: commons_v1_resources_pb.Error): void;
    hasError(): boolean;
    clearError(): void;

    getMethod(): string;
    setMethod(value: string): void;

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
      mimeType: string,
      statusCode: number,
      discoveryPath: string,
      warcId: string,
      referrer: string,
      error?: commons_v1_resources_pb.Error.AsObject,
      method: string,
    }
  }

}

