import * as jspb from 'google-protobuf'

import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as config_v1_resources_pb from '../../config/v1/resources_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class QueuedUri extends jspb.Message {
  getId(): string;
  setId(value: string): QueuedUri;

  getExecutionId(): string;
  setExecutionId(value: string): QueuedUri;

  getDiscoveredTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDiscoveredTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): QueuedUri;
  hasDiscoveredTimeStamp(): boolean;
  clearDiscoveredTimeStamp(): QueuedUri;

  getSequence(): number;
  setSequence(value: number): QueuedUri;

  getUri(): string;
  setUri(value: string): QueuedUri;

  getIp(): string;
  setIp(value: string): QueuedUri;

  getDiscoveryPath(): string;
  setDiscoveryPath(value: string): QueuedUri;

  getReferrer(): string;
  setReferrer(value: string): QueuedUri;

  getCookiesList(): Array<Cookie>;
  setCookiesList(value: Array<Cookie>): QueuedUri;
  clearCookiesList(): QueuedUri;
  addCookies(value?: Cookie, index?: number): Cookie;

  getPageFetchTimeMs(): number;
  setPageFetchTimeMs(value: number): QueuedUri;

  getRetries(): number;
  setRetries(value: number): QueuedUri;

  getEarliestFetchTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEarliestFetchTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): QueuedUri;
  hasEarliestFetchTimeStamp(): boolean;
  clearEarliestFetchTimeStamp(): QueuedUri;

  getCrawlHostGroupId(): string;
  setCrawlHostGroupId(value: string): QueuedUri;

  getPolitenessRef(): config_v1_resources_pb.ConfigRef | undefined;
  setPolitenessRef(value?: config_v1_resources_pb.ConfigRef): QueuedUri;
  hasPolitenessRef(): boolean;
  clearPolitenessRef(): QueuedUri;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): QueuedUri;
  hasError(): boolean;
  clearError(): QueuedUri;

  getJobExecutionId(): string;
  setJobExecutionId(value: string): QueuedUri;

  getUnresolved(): boolean;
  setUnresolved(value: boolean): QueuedUri;

  getFetchStartTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFetchStartTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): QueuedUri;
  hasFetchStartTimeStamp(): boolean;
  clearFetchStartTimeStamp(): QueuedUri;

  getPriorityWeight(): number;
  setPriorityWeight(value: number): QueuedUri;

  getSeedUri(): string;
  setSeedUri(value: string): QueuedUri;

  getAnnotationList(): Array<config_v1_resources_pb.Annotation>;
  setAnnotationList(value: Array<config_v1_resources_pb.Annotation>): QueuedUri;
  clearAnnotationList(): QueuedUri;
  addAnnotation(value?: config_v1_resources_pb.Annotation, index?: number): config_v1_resources_pb.Annotation;

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
    seedUri: string,
    annotationList: Array<config_v1_resources_pb.Annotation.AsObject>,
  }
}

export class Cookie extends jspb.Message {
  getName(): string;
  setName(value: string): Cookie;

  getValue(): string;
  setValue(value: string): Cookie;

  getDomain(): string;
  setDomain(value: string): Cookie;

  getPath(): string;
  setPath(value: string): Cookie;

  getExpires(): number;
  setExpires(value: number): Cookie;

  getSize(): number;
  setSize(value: number): Cookie;

  getHttpOnly(): boolean;
  setHttpOnly(value: boolean): Cookie;

  getSecure(): boolean;
  setSecure(value: boolean): Cookie;

  getSession(): boolean;
  setSession(value: boolean): Cookie;

  getSameSite(): string;
  setSameSite(value: string): Cookie;

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
  setId(value: string): CrawlHostGroup;

  getMinTimeBetweenPageLoadMs(): number;
  setMinTimeBetweenPageLoadMs(value: number): CrawlHostGroup;

  getMaxTimeBetweenPageLoadMs(): number;
  setMaxTimeBetweenPageLoadMs(value: number): CrawlHostGroup;

  getDelayFactor(): number;
  setDelayFactor(value: number): CrawlHostGroup;

  getMaxRetries(): number;
  setMaxRetries(value: number): CrawlHostGroup;

  getRetryDelaySeconds(): number;
  setRetryDelaySeconds(value: number): CrawlHostGroup;

  getQueuedUriCount(): number;
  setQueuedUriCount(value: number): CrawlHostGroup;

  getCurrentUriId(): string;
  setCurrentUriId(value: string): CrawlHostGroup;

  getSessionToken(): string;
  setSessionToken(value: string): CrawlHostGroup;

  getFetchStartTimeStamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFetchStartTimeStamp(value?: google_protobuf_timestamp_pb.Timestamp): CrawlHostGroup;
  hasFetchStartTimeStamp(): boolean;
  clearFetchStartTimeStamp(): CrawlHostGroup;

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
    minTimeBetweenPageLoadMs: number,
    maxTimeBetweenPageLoadMs: number,
    delayFactor: number,
    maxRetries: number,
    retryDelaySeconds: number,
    queuedUriCount: number,
    currentUriId: string,
    sessionToken: string,
    fetchStartTimeStamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class CrawlExecutionStatus extends jspb.Message {
  getId(): string;
  setId(value: string): CrawlExecutionStatus;

  getState(): CrawlExecutionStatus.State;
  setState(value: CrawlExecutionStatus.State): CrawlExecutionStatus;

  getJobId(): string;
  setJobId(value: string): CrawlExecutionStatus;

  getSeedId(): string;
  setSeedId(value: string): CrawlExecutionStatus;

  getStartTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTime(value?: google_protobuf_timestamp_pb.Timestamp): CrawlExecutionStatus;
  hasStartTime(): boolean;
  clearStartTime(): CrawlExecutionStatus;

  getEndTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEndTime(value?: google_protobuf_timestamp_pb.Timestamp): CrawlExecutionStatus;
  hasEndTime(): boolean;
  clearEndTime(): CrawlExecutionStatus;

  getDocumentsCrawled(): number;
  setDocumentsCrawled(value: number): CrawlExecutionStatus;

  getBytesCrawled(): number;
  setBytesCrawled(value: number): CrawlExecutionStatus;

  getUrisCrawled(): number;
  setUrisCrawled(value: number): CrawlExecutionStatus;

  getDocumentsFailed(): number;
  setDocumentsFailed(value: number): CrawlExecutionStatus;

  getDocumentsOutOfScope(): number;
  setDocumentsOutOfScope(value: number): CrawlExecutionStatus;

  getDocumentsRetried(): number;
  setDocumentsRetried(value: number): CrawlExecutionStatus;

  getDocumentsDenied(): number;
  setDocumentsDenied(value: number): CrawlExecutionStatus;

  getLastChangeTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setLastChangeTime(value?: google_protobuf_timestamp_pb.Timestamp): CrawlExecutionStatus;
  hasLastChangeTime(): boolean;
  clearLastChangeTime(): CrawlExecutionStatus;

  getCreatedTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedTime(value?: google_protobuf_timestamp_pb.Timestamp): CrawlExecutionStatus;
  hasCreatedTime(): boolean;
  clearCreatedTime(): CrawlExecutionStatus;

  getCurrentUriIdList(): Array<string>;
  setCurrentUriIdList(value: Array<string>): CrawlExecutionStatus;
  clearCurrentUriIdList(): CrawlExecutionStatus;
  addCurrentUriId(value: string, index?: number): CrawlExecutionStatus;

  getJobExecutionId(): string;
  setJobExecutionId(value: string): CrawlExecutionStatus;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): CrawlExecutionStatus;
  hasError(): boolean;
  clearError(): CrawlExecutionStatus;

  getDesiredState(): CrawlExecutionStatus.State;
  setDesiredState(value: CrawlExecutionStatus.State): CrawlExecutionStatus;

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
    desiredState: CrawlExecutionStatus.State,
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
  setId(value: string): CrawlExecutionStatusChange;

  getState(): CrawlExecutionStatus.State;
  setState(value: CrawlExecutionStatus.State): CrawlExecutionStatusChange;

  getEndTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEndTime(value?: google_protobuf_timestamp_pb.Timestamp): CrawlExecutionStatusChange;
  hasEndTime(): boolean;
  clearEndTime(): CrawlExecutionStatusChange;

  getAddDocumentsCrawled(): number;
  setAddDocumentsCrawled(value: number): CrawlExecutionStatusChange;

  getAddBytesCrawled(): number;
  setAddBytesCrawled(value: number): CrawlExecutionStatusChange;

  getAddUrisCrawled(): number;
  setAddUrisCrawled(value: number): CrawlExecutionStatusChange;

  getAddDocumentsFailed(): number;
  setAddDocumentsFailed(value: number): CrawlExecutionStatusChange;

  getAddDocumentsOutOfScope(): number;
  setAddDocumentsOutOfScope(value: number): CrawlExecutionStatusChange;

  getAddDocumentsRetried(): number;
  setAddDocumentsRetried(value: number): CrawlExecutionStatusChange;

  getAddDocumentsDenied(): number;
  setAddDocumentsDenied(value: number): CrawlExecutionStatusChange;

  getAddCurrentUri(): QueuedUri | undefined;
  setAddCurrentUri(value?: QueuedUri): CrawlExecutionStatusChange;
  hasAddCurrentUri(): boolean;
  clearAddCurrentUri(): CrawlExecutionStatusChange;

  getDeleteCurrentUri(): QueuedUri | undefined;
  setDeleteCurrentUri(value?: QueuedUri): CrawlExecutionStatusChange;
  hasDeleteCurrentUri(): boolean;
  clearDeleteCurrentUri(): CrawlExecutionStatusChange;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): CrawlExecutionStatusChange;
  hasError(): boolean;
  clearError(): CrawlExecutionStatusChange;

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
  setId(value: string): JobExecutionStatus;

  getJobId(): string;
  setJobId(value: string): JobExecutionStatus;

  getState(): JobExecutionStatus.State;
  setState(value: JobExecutionStatus.State): JobExecutionStatus;

  getExecutionsStateMap(): jspb.Map<string, number>;
  clearExecutionsStateMap(): JobExecutionStatus;

  getStartTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTime(value?: google_protobuf_timestamp_pb.Timestamp): JobExecutionStatus;
  hasStartTime(): boolean;
  clearStartTime(): JobExecutionStatus;

  getEndTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEndTime(value?: google_protobuf_timestamp_pb.Timestamp): JobExecutionStatus;
  hasEndTime(): boolean;
  clearEndTime(): JobExecutionStatus;

  getDocumentsCrawled(): number;
  setDocumentsCrawled(value: number): JobExecutionStatus;

  getBytesCrawled(): number;
  setBytesCrawled(value: number): JobExecutionStatus;

  getUrisCrawled(): number;
  setUrisCrawled(value: number): JobExecutionStatus;

  getDocumentsFailed(): number;
  setDocumentsFailed(value: number): JobExecutionStatus;

  getDocumentsOutOfScope(): number;
  setDocumentsOutOfScope(value: number): JobExecutionStatus;

  getDocumentsRetried(): number;
  setDocumentsRetried(value: number): JobExecutionStatus;

  getDocumentsDenied(): number;
  setDocumentsDenied(value: number): JobExecutionStatus;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): JobExecutionStatus;
  hasError(): boolean;
  clearError(): JobExecutionStatus;

  getDesiredState(): JobExecutionStatus.State;
  setDesiredState(value: JobExecutionStatus.State): JobExecutionStatus;

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
    desiredState: JobExecutionStatus.State,
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

