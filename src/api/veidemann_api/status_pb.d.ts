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

export class ExecutionId {
  constructor ();
  getId(): string;
  setId(a: string): void;
  toObject(): ExecutionId.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ExecutionId;
}

export namespace ExecutionId {
  export type AsObject = {
    id: string;
  }
}

export class ExecutionsListReply {
  constructor ();
  getValueList(): CrawlExecutionStatus[];
  setValueList(a: CrawlExecutionStatus[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): ExecutionsListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ExecutionsListReply;
}

export namespace ExecutionsListReply {
  export type AsObject = {
    valueList: CrawlExecutionStatus[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class JobExecutionsListReply {
  constructor ();
  getValueList(): JobExecutionStatus[];
  setValueList(a: JobExecutionStatus[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): JobExecutionsListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => JobExecutionsListReply;
}

export namespace JobExecutionsListReply {
  export type AsObject = {
    valueList: JobExecutionStatus[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class ListExecutionsRequest {
  constructor ();
  getIdList(): string[];
  setIdList(a: string[]): void;
  getStateList(): string[];
  setStateList(a: string[]): void;
  getSeedId(): string;
  setSeedId(a: string): void;
  getJobId(): string;
  setJobId(a: string): void;
  getJobExecutionId(): string;
  setJobExecutionId(a: string): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): ListExecutionsRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ListExecutionsRequest;
}

export namespace ListExecutionsRequest {
  export type AsObject = {
    idList: string[];
    stateList: string[];
    seedId: string;
    jobId: string;
    jobExecutionId: string;
    pageSize: number;
    page: number;
  }
}

export class ListJobExecutionsRequest {
  constructor ();
  getIdList(): string[];
  setIdList(a: string[]): void;
  getStateList(): string[];
  setStateList(a: string[]): void;
  getJobId(): string;
  setJobId(a: string): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): ListJobExecutionsRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ListJobExecutionsRequest;
}

export namespace ListJobExecutionsRequest {
  export type AsObject = {
    idList: string[];
    stateList: string[];
    jobId: string;
    pageSize: number;
    page: number;
  }
}

export class RunningExecutionsListReply {
  constructor ();
  getValueList(): StatusDetail[];
  setValueList(a: StatusDetail[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): RunningExecutionsListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => RunningExecutionsListReply;
}

export namespace RunningExecutionsListReply {
  export type AsObject = {
    valueList: StatusDetail[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class RunningExecutionsRequest {
  constructor ();
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): RunningExecutionsRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => RunningExecutionsRequest;
}

export namespace RunningExecutionsRequest {
  export type AsObject = {
    pageSize: number;
    page: number;
  }
}

export class StatusDetail {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getState(): CrawlExecutionStatus.State;
  setState(a: CrawlExecutionStatus.State): void;
  getJobid(): string;
  setJobid(a: string): void;
  getSeed(): string;
  setSeed(a: string): void;
  getStartTime(): Timestamp;
  setStartTime(a: Timestamp): void;
  getEndTime(): Timestamp;
  setEndTime(a: Timestamp): void;
  getDocumentsCrawled(): number;
  setDocumentsCrawled(a: number): void;
  getBytesCrawled(): number;
  setBytesCrawled(a: number): void;
  getUrisCrawled(): number;
  setUrisCrawled(a: number): void;
  getDocumentsFailed(): number;
  setDocumentsFailed(a: number): void;
  getDocumentsOutOfScope(): number;
  setDocumentsOutOfScope(a: number): void;
  getDocumentsRetried(): number;
  setDocumentsRetried(a: number): void;
  getDocumentsDenied(): number;
  setDocumentsDenied(a: number): void;
  getQueueSize(): number;
  setQueueSize(a: number): void;
  getCurrentUri(): string;
  setCurrentUri(a: string): void;
  toObject(): StatusDetail.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => StatusDetail;
}

export namespace StatusDetail {
  export type AsObject = {
    id: string;
    state: CrawlExecutionStatus.State;
    jobid: string;
    seed: string;
    startTime: Timestamp;
    endTime: Timestamp;
    documentsCrawled: number;
    bytesCrawled: number;
    urisCrawled: number;
    documentsFailed: number;
    documentsOutOfScope: number;
    documentsRetried: number;
    documentsDenied: number;
    queueSize: number;
    currentUri: string;
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

export class CrawlScope {
  constructor ();
  getSurtPrefix(): string;
  setSurtPrefix(a: string): void;
  toObject(): CrawlScope.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlScope;
}

export namespace CrawlScope {
  export type AsObject = {
    surtPrefix: string;
  }
}

export class CrawlExecutionStatus {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getState(): CrawlExecutionStatus.State;
  setState(a: CrawlExecutionStatus.State): void;
  getJobId(): string;
  setJobId(a: string): void;
  getSeedId(): string;
  setSeedId(a: string): void;
  getScope(): CrawlScope;
  setScope(a: CrawlScope): void;
  getStartTime(): Timestamp;
  setStartTime(a: Timestamp): void;
  getEndTime(): Timestamp;
  setEndTime(a: Timestamp): void;
  getDocumentsCrawled(): number;
  setDocumentsCrawled(a: number): void;
  getBytesCrawled(): number;
  setBytesCrawled(a: number): void;
  getUrisCrawled(): number;
  setUrisCrawled(a: number): void;
  getDocumentsFailed(): number;
  setDocumentsFailed(a: number): void;
  getDocumentsOutOfScope(): number;
  setDocumentsOutOfScope(a: number): void;
  getDocumentsRetried(): number;
  setDocumentsRetried(a: number): void;
  getDocumentsDenied(): number;
  setDocumentsDenied(a: number): void;
  getLastChangeTime(): Timestamp;
  setLastChangeTime(a: Timestamp): void;
  getCreatedTime(): Timestamp;
  setCreatedTime(a: Timestamp): void;
  getCurrentUriIdList(): string[];
  setCurrentUriIdList(a: string[]): void;
  getJobExecutionId(): string;
  setJobExecutionId(a: string): void;
  getError(): Error;
  setError(a: Error): void;
  toObject(): CrawlExecutionStatus.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlExecutionStatus;
}

export namespace CrawlExecutionStatus {
  export type AsObject = {
    id: string;
    state: CrawlExecutionStatus.State;
    jobId: string;
    seedId: string;
    scope: CrawlScope;
    startTime: Timestamp;
    endTime: Timestamp;
    documentsCrawled: number;
    bytesCrawled: number;
    urisCrawled: number;
    documentsFailed: number;
    documentsOutOfScope: number;
    documentsRetried: number;
    documentsDenied: number;
    lastChangeTime: Timestamp;
    createdTime: Timestamp;
    currentUriIdList: string[];
    jobExecutionId: string;
    error: Error;
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

export class JobExecutionStatus {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getJobId(): string;
  setJobId(a: string): void;
  getState(): JobExecutionStatus.State;
  setState(a: JobExecutionStatus.State): void;
  getExecutionsStateList(): JobExecutionStatus.ExecutionsStateEntry[];
  setExecutionsStateList(a: JobExecutionStatus.ExecutionsStateEntry[]): void;
  getStartTime(): Timestamp;
  setStartTime(a: Timestamp): void;
  getEndTime(): Timestamp;
  setEndTime(a: Timestamp): void;
  getDocumentsCrawled(): number;
  setDocumentsCrawled(a: number): void;
  getBytesCrawled(): number;
  setBytesCrawled(a: number): void;
  getUrisCrawled(): number;
  setUrisCrawled(a: number): void;
  getDocumentsFailed(): number;
  setDocumentsFailed(a: number): void;
  getDocumentsOutOfScope(): number;
  setDocumentsOutOfScope(a: number): void;
  getDocumentsRetried(): number;
  setDocumentsRetried(a: number): void;
  getDocumentsDenied(): number;
  setDocumentsDenied(a: number): void;
  getError(): Error;
  setError(a: Error): void;
  toObject(): JobExecutionStatus.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => JobExecutionStatus;
}

export namespace JobExecutionStatus {
  export type AsObject = {
    id: string;
    jobId: string;
    state: JobExecutionStatus.State;
    executionsStateList: JobExecutionStatus.ExecutionsStateEntry[];
    startTime: Timestamp;
    endTime: Timestamp;
    documentsCrawled: number;
    bytesCrawled: number;
    urisCrawled: number;
    documentsFailed: number;
    documentsOutOfScope: number;
    documentsRetried: number;
    documentsDenied: number;
    error: Error;
  }
  export type ExecutionsStateEntry = JobExecutionStatusExecutionsStateEntry;

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

export class JobExecutionStatusExecutionsStateEntry {
  constructor ();
  getKey(): string;
  setKey(a: string): void;
  getValue(): number;
  setValue(a: number): void;
  toObject(): JobExecutionStatusExecutionsStateEntry.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => JobExecutionStatusExecutionsStateEntry;
}

export namespace JobExecutionStatusExecutionsStateEntry {
  export type AsObject = {
    key: string;
    value: number;
  }
}

export class ExecutionsStateEntry {
  constructor ();
  getKey(): string;
  setKey(a: string): void;
  getValue(): number;
  setValue(a: number): void;
  toObject(): ExecutionsStateEntry.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ExecutionsStateEntry;
}

export namespace ExecutionsStateEntry {
  export type AsObject = {
    key: string;
    value: number;
  }
}

