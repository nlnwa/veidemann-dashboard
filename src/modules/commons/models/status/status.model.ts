import {ErrorProto, JobExecutionStatusProto} from '../../../../api';
import {fromTimestampProto} from '../../func';
import {ExtraStatusCodes} from '../extrastatuscodes.model';

export enum State {
  UNDEFINED = 0,
  CREATED = 1,
  RUNNING = 2,
  FINISHED = 3,
  ABORTED_MANUAL = 4,
  FAILED = 5,
  DIED = 6,
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
    if (!proto) {
      return null;
    }
    return new Error({
      code: ExtraStatusCodes[proto.getCode()],
      msg: proto.getMsg(),
      detail: proto.getDetail()
    });
  }
}

export class JobExecutionStatus {
  id: string;
  jobId: string;
  state: State;
  executionsStateMap: Map<string, number>;
  startTime: string;
  endTime: string;
  documentsCrawled: number;
  bytesCrawled: number;
  urisCrawled: number;
  documentsFailed: number;
  documentsOutOfScope: number;
  documentsRetried: number;
  documentsDenied: number;
  error: Error;

  constructor({
                id = '',
                jobId = '',
                state = State.UNDEFINED,
                executionsStateMap = new Map(),
                startTime = '',
                endTime = '',
                documentsCrawled = 0,
                bytesCrawled = 0,
                urisCrawled = 0,
                documentsFailed = 0,
                documentsOutOfScope = 0,
                documentsRetried = 0,
                documentsDenied = 0,
                error = new Error()
              }: Partial<JobExecutionStatus> = {}) {
    this.id = id;
    this.jobId = jobId;
    this.state = state;
    this.executionsStateMap = executionsStateMap;
    this.startTime = startTime;
    this.endTime = endTime;
    this.documentsCrawled = documentsCrawled;
    this.bytesCrawled = bytesCrawled;
    this.urisCrawled = urisCrawled;
    this.documentsFailed = documentsFailed;
    this.documentsOutOfScope = documentsOutOfScope;
    this.documentsRetried = documentsRetried;
    this.documentsDenied = documentsDenied;
    this.error = error;
  }

  static fromProto(proto: JobExecutionStatusProto): JobExecutionStatus {
    const extraStatusCodes = ExtraStatusCodes;
    return new JobExecutionStatus({
      id: proto.getId(),
      jobId: proto.getJobId(),
      state: proto.getState(),
      executionsStateMap: new Map(proto.getExecutionsStateMap().toArray()),
      startTime: fromTimestampProto(proto.getStartTime()),
      endTime: fromTimestampProto(proto.getEndTime()),
      documentsCrawled: proto.getDocumentsCrawled(),
      bytesCrawled: proto.getBytesCrawled(),
      urisCrawled: proto.getUrisCrawled(),
      documentsFailed: proto.getDocumentsFailed(),
      documentsOutOfScope: proto.getDocumentsOutOfScope(),
      documentsRetried: proto.getDocumentsRetried(),
      documentsDenied: proto.getDocumentsDenied(),
      error: Error.fromProto(proto.getError())
    });
  }

  static toProto(jobExecutionStatus: JobExecutionStatus): JobExecutionStatusProto {
    const proto = new JobExecutionStatusProto();
    proto.setId(jobExecutionStatus.id);
    proto.setJobId(jobExecutionStatus.jobId);
    proto.setState(jobExecutionStatus.state);
    proto.setDocumentsCrawled(jobExecutionStatus.documentsCrawled);
    proto.setBytesCrawled(jobExecutionStatus.bytesCrawled);
    proto.setUrisCrawled(jobExecutionStatus.urisCrawled);
    proto.setDocumentsFailed(jobExecutionStatus.documentsFailed);
    proto.setDocumentsOutOfScope(jobExecutionStatus.documentsOutOfScope);
    proto.setDocumentsRetried(jobExecutionStatus.documentsRetried);
    proto.setDocumentsDenied(jobExecutionStatus.documentsDenied);

    return proto;
  }
}


