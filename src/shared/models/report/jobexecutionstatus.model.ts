import {JobExecutionStatusProto} from '../../../api';
import {fromTimestampProto, isNumeric} from '../../func';
import {ExtraStatusCodes} from './extrastatuscodes.model';
import {ApiError} from '../commons/api-error.model';

export enum JobExecutionState {
  UNDEFINED = 0,
  CREATED = 1,
  RUNNING = 2,
  FINISHED = 3,
  ABORTED_MANUAL = 4,
  FAILED = 5,
  DIED = 6,
}

export const jobExecutionStates: JobExecutionState[] =
  Object.keys(JobExecutionState).filter(p => !isNumeric(p)).map(state => JobExecutionState[state]);

export class JobExecutionStatus {
  static DONE_STATES = [
    JobExecutionState.ABORTED_MANUAL,
    JobExecutionState.FAILED,
    JobExecutionState.FINISHED,
  ];

  id: string;
  jobId: string;
  state: JobExecutionState;
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
  error: ApiError;

  constructor({
                id = '',
                jobId = '',
                state = JobExecutionState.UNDEFINED,
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
                error = new ApiError()
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
      state: JobExecutionState[JobExecutionState[proto.getState()]],
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
      error: ApiError.fromProto(proto.getError())
    });
  }

  static toProto(jobExecutionStatus: JobExecutionStatus): JobExecutionStatusProto {
    const proto = new JobExecutionStatusProto();
    proto.setId(jobExecutionStatus.id);
    proto.setJobId(jobExecutionStatus.jobId);
    proto.setState(jobExecutionStatus.state.valueOf());
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


