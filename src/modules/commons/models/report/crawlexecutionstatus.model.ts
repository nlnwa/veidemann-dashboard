import {CrawlExecutionStatusProto} from '../../../../api';
import {fromTimestampProto, toTimestampProto} from '../../func';
import {ExtraStatusCodes} from './extrastatuscodes.model';
import {ApiError} from './api-error.model';
import {CrawlScope} from '../config/crawlscope.model';

export enum CrawlExecutionState {
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

export class CrawlExecutionStatus {
  id: string;
  state: CrawlExecutionState;
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
  error: ApiError;

  constructor({
                id = '',
                state = CrawlExecutionState.UNDEFINED,
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
                error = new ApiError()
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
    const state = CrawlExecutionState;

    return new CrawlExecutionStatus({
      id: proto.getId(),
      jobId: proto.getJobId(),
      seedId: proto.getSeedId(),
      state: CrawlExecutionState[CrawlExecutionState[proto.getState()]],
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
      error: ApiError.fromProto(proto.getError())
    });
  }

  static toProto(crawlExecutionStatus: CrawlExecutionStatus): CrawlExecutionStatusProto {
    const proto = new CrawlExecutionStatusProto();
    proto.setId(crawlExecutionStatus.id);
    proto.setJobId(crawlExecutionStatus.jobId);
    proto.setSeedId(crawlExecutionStatus.seedId);
    proto.setState(crawlExecutionStatus.state.valueOf());
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
