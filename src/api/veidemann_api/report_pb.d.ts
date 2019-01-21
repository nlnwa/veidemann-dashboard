export class Timestamp {
  constructor ();
  getSeconds(): number;
  setSeconds(a: number): void;
  getNanos(): number;
  setNanos(a: number): void;
  toObject(): Timestamp.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Timestamp;
}

export namespace Timestamp {
  export type AsObject = {
    seconds: number;
    nanos: number;
  }
}

export class CrawlLogListReply {
  constructor ();
  getValueList(): CrawlLog[];
  setValueList(a: CrawlLog[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): CrawlLogListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlLogListReply;
}

export namespace CrawlLogListReply {
  export type AsObject = {
    valueList: CrawlLog[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class CrawlLogListRequest {
  constructor ();
  getWarcIdList(): string[];
  setWarcIdList(a: string[]): void;
  getExecutionId(): string;
  setExecutionId(a: string): void;
  getFilterList(): Filter[];
  setFilterList(a: Filter[]): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): CrawlLogListRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlLogListRequest;
}

export namespace CrawlLogListRequest {
  export type AsObject = {
    warcIdList: string[];
    executionId: string;
    filterList: Filter[];
    pageSize: number;
    page: number;
  }
}

export class ExecuteDbQueryReply {
  constructor ();
  getRecord(): string;
  setRecord(a: string): void;
  toObject(): ExecuteDbQueryReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ExecuteDbQueryReply;
}

export namespace ExecuteDbQueryReply {
  export type AsObject = {
    record: string;
  }
}

export class ExecuteDbQueryRequest {
  constructor ();
  getQuery(): string;
  setQuery(a: string): void;
  getLimit(): number;
  setLimit(a: number): void;
  toObject(): ExecuteDbQueryRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ExecuteDbQueryRequest;
}

export namespace ExecuteDbQueryRequest {
  export type AsObject = {
    query: string;
    limit: number;
  }
}

export class Filter {
  constructor ();
  getFieldName(): string;
  setFieldName(a: string): void;
  getOp(): Filter.Operator;
  setOp(a: Filter.Operator): void;
  getValue(): string;
  setValue(a: string): void;
  toObject(): Filter.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Filter;
}

export namespace Filter {
  export type AsObject = {
    fieldName: string;
    op: Filter.Operator;
    value: string;
  }

  export enum Operator { 
    EQ = 0,
    NE = 1,
    MATCH = 2,
    LT = 3,
    GT = 4,
  }
}

export class PageLogListReply {
  constructor ();
  getValueList(): PageLog[];
  setValueList(a: PageLog[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): PageLogListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => PageLogListReply;
}

export namespace PageLogListReply {
  export type AsObject = {
    valueList: PageLog[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class PageLogListRequest {
  constructor ();
  getWarcIdList(): string[];
  setWarcIdList(a: string[]): void;
  getExecutionId(): string;
  setExecutionId(a: string): void;
  getFilterList(): Filter[];
  setFilterList(a: Filter[]): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): PageLogListRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => PageLogListRequest;
}

export namespace PageLogListRequest {
  export type AsObject = {
    warcIdList: string[];
    executionId: string;
    filterList: Filter[];
    pageSize: number;
    page: number;
  }
}

export class Screenshot {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getExecutionId(): string;
  setExecutionId(a: string): void;
  getUri(): string;
  setUri(a: string): void;
  getImg(): {};
  setImg(a: {}): void;
  toObject(): Screenshot.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Screenshot;
}

export namespace Screenshot {
  export type AsObject = {
    id: string;
    executionId: string;
    uri: string;
    img: {};
  }
}

export class ScreenshotListReply {
  constructor ();
  getValueList(): Screenshot[];
  setValueList(a: Screenshot[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): ScreenshotListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ScreenshotListReply;
}

export namespace ScreenshotListReply {
  export type AsObject = {
    valueList: Screenshot[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class ScreenshotListRequest {
  constructor ();
  getIdList(): string[];
  setIdList(a: string[]): void;
  getExecutionId(): string;
  setExecutionId(a: string): void;
  getFilterList(): Filter[];
  setFilterList(a: Filter[]): void;
  getImgData(): boolean;
  setImgData(a: boolean): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): ScreenshotListRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ScreenshotListRequest;
}

export namespace ScreenshotListRequest {
  export type AsObject = {
    idList: string[];
    executionId: string;
    filterList: Filter[];
    imgData: boolean;
    pageSize: number;
    page: number;
  }
}

export class Error {
  constructor ();
  getCode(): number;
  setCode(a: number): void;
  getMsg(): string;
  setMsg(a: string): void;
  getDetail(): string;
  setDetail(a: string): void;
  toObject(): Error.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Error;
}

export namespace Error {
  export type AsObject = {
    code: number;
    msg: string;
    detail: string;
  }
}

export class CrawlLog {
  constructor ();
  getWarcId(): string;
  setWarcId(a: string): void;
  getTimeStamp(): Timestamp;
  setTimeStamp(a: Timestamp): void;
  getSurt(): string;
  setSurt(a: string): void;
  getStatusCode(): number;
  setStatusCode(a: number): void;
  getSize(): number;
  setSize(a: number): void;
  getRequestedUri(): string;
  setRequestedUri(a: string): void;
  getResponseUri(): string;
  setResponseUri(a: string): void;
  getDiscoveryPath(): string;
  setDiscoveryPath(a: string): void;
  getReferrer(): string;
  setReferrer(a: string): void;
  getContentType(): string;
  setContentType(a: string): void;
  getFetchTimeStamp(): Timestamp;
  setFetchTimeStamp(a: Timestamp): void;
  getFetchTimeMs(): number;
  setFetchTimeMs(a: number): void;
  getBlockDigest(): string;
  setBlockDigest(a: string): void;
  getPayloadDigest(): string;
  setPayloadDigest(a: string): void;
  getStorageRef(): string;
  setStorageRef(a: string): void;
  getRecordType(): string;
  setRecordType(a: string): void;
  getWarcRefersTo(): string;
  setWarcRefersTo(a: string): void;
  getIpAddress(): string;
  setIpAddress(a: string): void;
  getExecutionId(): string;
  setExecutionId(a: string): void;
  getRetries(): number;
  setRetries(a: number): void;
  getError(): Error;
  setError(a: Error): void;
  getJobExecutionId(): string;
  setJobExecutionId(a: string): void;
  getCollectionFinalName(): string;
  setCollectionFinalName(a: string): void;
  toObject(): CrawlLog.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlLog;
}

export namespace CrawlLog {
  export type AsObject = {
    warcId: string;
    timeStamp: Timestamp;
    surt: string;
    statusCode: number;
    size: number;
    requestedUri: string;
    responseUri: string;
    discoveryPath: string;
    referrer: string;
    contentType: string;
    fetchTimeStamp: Timestamp;
    fetchTimeMs: number;
    blockDigest: string;
    payloadDigest: string;
    storageRef: string;
    recordType: string;
    warcRefersTo: string;
    ipAddress: string;
    executionId: string;
    retries: number;
    error: Error;
    jobExecutionId: string;
    collectionFinalName: string;
  }
}

export class PageLog {
  constructor ();
  getWarcId(): string;
  setWarcId(a: string): void;
  getUri(): string;
  setUri(a: string): void;
  getExecutionId(): string;
  setExecutionId(a: string): void;
  getReferrer(): string;
  setReferrer(a: string): void;
  getJobExecutionId(): string;
  setJobExecutionId(a: string): void;
  getCollectionFinalName(): string;
  setCollectionFinalName(a: string): void;
  getResourceList(): PageLog.Resource[];
  setResourceList(a: PageLog.Resource[]): void;
  getOutlinkList(): string[];
  setOutlinkList(a: string[]): void;
  toObject(): PageLog.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => PageLog;
}

export namespace PageLog {
  export type AsObject = {
    warcId: string;
    uri: string;
    executionId: string;
    referrer: string;
    jobExecutionId: string;
    collectionFinalName: string;
    resourceList: PageLog.Resource[];
    outlinkList: string[];
  }
  export type Resource = PageLogResource;
}

export class PageLogResource {
  constructor ();
  getUri(): string;
  setUri(a: string): void;
  getFromCache(): boolean;
  setFromCache(a: boolean): void;
  getRenderable(): boolean;
  setRenderable(a: boolean): void;
  getResourceType(): string;
  setResourceType(a: string): void;
  getMimeType(): string;
  setMimeType(a: string): void;
  getStatusCode(): number;
  setStatusCode(a: number): void;
  getDiscoveryPath(): string;
  setDiscoveryPath(a: string): void;
  getWarcId(): string;
  setWarcId(a: string): void;
  getReferrer(): string;
  setReferrer(a: string): void;
  getError(): Error;
  setError(a: Error): void;
  toObject(): PageLogResource.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => PageLogResource;
}

export namespace PageLogResource {
  export type AsObject = {
    uri: string;
    fromCache: boolean;
    renderable: boolean;
    resourceType: string;
    mimeType: string;
    statusCode: number;
    discoveryPath: string;
    warcId: string;
    referrer: string;
    error: Error;
  }
}

export class Resource {
  constructor ();
  getUri(): string;
  setUri(a: string): void;
  getFromCache(): boolean;
  setFromCache(a: boolean): void;
  getRenderable(): boolean;
  setRenderable(a: boolean): void;
  getResourceType(): string;
  setResourceType(a: string): void;
  getMimeType(): string;
  setMimeType(a: string): void;
  getStatusCode(): number;
  setStatusCode(a: number): void;
  getDiscoveryPath(): string;
  setDiscoveryPath(a: string): void;
  getWarcId(): string;
  setWarcId(a: string): void;
  getReferrer(): string;
  setReferrer(a: string): void;
  getError(): Error;
  setError(a: Error): void;
  toObject(): Resource.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Resource;
}

export namespace Resource {
  export type AsObject = {
    uri: string;
    fromCache: boolean;
    renderable: boolean;
    resourceType: string;
    mimeType: string;
    statusCode: number;
    discoveryPath: string;
    warcId: string;
    referrer: string;
    error: Error;
  }
}

