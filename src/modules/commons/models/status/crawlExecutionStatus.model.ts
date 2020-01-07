import {CrawlExecutionStatusProto, ErrorProto} from '../../../../api';
import {fromTimestampProto, toTimestampProto} from '../../func';
import {ExtraStatusCodes} from '../extrastatuscodes.model';

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

export class CrawlScope {
  surtPrefix: string;

  constructor({
                surtPrefix = ''
              }: Partial<CrawlScope> = {}) {
    this.surtPrefix = surtPrefix;
  }
}

export class Error {
  code: string;
  msg: string;
  detail: string;

  constructor({
                code = '',
                msg = '',
                detail = ''
              }: Partial<Error> = {}) {
    this.code = code;
    this.msg = msg;
    this.detail = detail;
  }

  static fromProto(proto: ErrorProto): Error {
    if (proto) {
      return new Error({
        code: ExtraStatusCodes[proto.getCode()],
        msg: proto.getMsg(),
        detail: proto.getDetail()
      });
    } else {
      return null;
    }
  }
}

export class CrawlExecutionStatus {
  id: string;
  state: string;
  jobId: string;
  seedId: string;
  scope: CrawlScope;
  startTime: string;
  endTime: string;
  documentsCrawled: number;
  bytesCrawled: number;
  urisCrawled: number;
  documentsFailed: number;
  documentsOutOfScope: number;
  documentsRetried: number;
  documentsDenied: number;
  lastChangeTime: string;
  createdTime: string;
  currentUriIdList: Array<string>;
  jobExecutionId: string;
  error: Error;

  constructor({
                id = '',
                state = '',
                jobId = '',
                seedId = '',
                scope = new CrawlScope(),
                startTime = '',
                endTime = '',
                documentsCrawled = 0,
                bytesCrawled = 0,
                urisCrawled = 0,
                documentsFailed = 0,
                documentsOutOfScope = 0,
                documentsRetried = 0,
                documentsDenied = 0,
                lastChangeTime = '',
                createdTime = '',
                currentUriIdList = [],
                jobExecutionId = '',
                error = new Error()
              }: Partial<CrawlExecutionStatus> = {}) {
    this.id = id;
    this.jobId = jobId;
    this.seedId = seedId;
    this.state = state;
    this.scope = scope;
    this.startTime = startTime;
    this.endTime = endTime;
    this.documentsCrawled = documentsCrawled;
    this.bytesCrawled = bytesCrawled;
    this.urisCrawled = urisCrawled;
    this.documentsFailed = documentsFailed;
    this.documentsOutOfScope = documentsOutOfScope;
    this.documentsRetried = documentsRetried;
    this.documentsDenied = documentsDenied;
    this.lastChangeTime = lastChangeTime;
    this.createdTime = createdTime;
    this.currentUriIdList = currentUriIdList;
    this.jobExecutionId = jobExecutionId;
    this.error = error;
  }

  static fromProto(proto: CrawlExecutionStatusProto): CrawlExecutionStatus {
    const extraStatusCodes = ExtraStatusCodes;
    const state = State;

    return new CrawlExecutionStatus({
      id: proto.getId(),
      jobId: proto.getJobId(),
      seedId: proto.getSeedId(),
      state: State[proto.getState()],
      startTime: fromTimestampProto(proto.getStartTime()),
      endTime: fromTimestampProto(proto.getEndTime()),
      documentsCrawled: proto.getDocumentsCrawled(),
      bytesCrawled: proto.getBytesCrawled(),
      urisCrawled: proto.getUrisCrawled(),
      documentsFailed: proto.getDocumentsFailed(),
      documentsOutOfScope: proto.getDocumentsOutOfScope(),
      documentsRetried: proto.getDocumentsRetried(),
      documentsDenied: proto.getDocumentsDenied(),
      lastChangeTime: fromTimestampProto(proto.getLastChangeTime()),
      createdTime: fromTimestampProto(proto.getCreatedTime()),
      currentUriIdList: proto.getCurrentUriIdList(),
      jobExecutionId: proto.getJobExecutionId(),
      error: Error.fromProto(proto.getError())
    });
  }

  static toProto(crawlExecutionStatus: CrawlExecutionStatus): CrawlExecutionStatusProto {
    const proto = new CrawlExecutionStatusProto();
    proto.setId(crawlExecutionStatus.id);
    proto.setJobId(crawlExecutionStatus.jobId);
    proto.setSeedId(crawlExecutionStatus.seedId);
    proto.setState(State[crawlExecutionStatus.state]);
    proto.setStartTime(toTimestampProto(crawlExecutionStatus.startTime));
    proto.setEndTime(toTimestampProto(crawlExecutionStatus.endTime));
    proto.setDocumentsCrawled(crawlExecutionStatus.documentsCrawled);
    proto.setBytesCrawled(crawlExecutionStatus.bytesCrawled);
    proto.setUrisCrawled(crawlExecutionStatus.urisCrawled);
    proto.setDocumentsFailed(crawlExecutionStatus.documentsFailed);
    proto.setDocumentsOutOfScope(crawlExecutionStatus.documentsOutOfScope);
    proto.setDocumentsRetried(crawlExecutionStatus.documentsRetried);
    proto.setDocumentsDenied(crawlExecutionStatus.documentsDenied);
    proto.setLastChangeTime(toTimestampProto(crawlExecutionStatus.lastChangeTime));
    proto.setCreatedTime(toTimestampProto(crawlExecutionStatus.createdTime));
    proto.setCurrentUriIdList(crawlExecutionStatus.currentUriIdList);
    proto.setJobExecutionId(crawlExecutionStatus.jobExecutionId);
    return proto;
  }
}
