import {RunCrawlReplyProto, RunCrawlRequestProto} from '../../../api';

export enum RunStatus {
  RUNNING = 0,
  PAUSED = 1,
  PAUSE_REQUESTED = 2,
}

export class RunCrawlRequest {
  jobId: string;
  seedId: string;

  constructor({
                jobId = '',
                seedId = ''
              }: Partial<RunCrawlRequest> = {}) {
    this.jobId = jobId;
    this.seedId = seedId;
  }

  static fromProto(proto: RunCrawlRequestProto): RunCrawlRequest {
    return new RunCrawlRequest({
      jobId: proto.getJobId(),
      seedId: proto.getSeedId()
    });
  }

  static toProto(runCrawlRequest: RunCrawlRequest): RunCrawlRequestProto {
    const proto = new RunCrawlRequestProto();
    proto.setJobId(runCrawlRequest.jobId);
    proto.setSeedId(runCrawlRequest.seedId);

    return proto;
  }
}

export class RunCrawlReply {
  jobExecutionId: string;

  constructor({
                jobExecutionId = ''
              }: Partial<RunCrawlReply> = {}) {
    this.jobExecutionId = jobExecutionId;
  }

  static fromProto(proto: RunCrawlReplyProto): RunCrawlReply {
    return new RunCrawlReply({
      jobExecutionId: proto.getJobExecutionId()
    });
  }

  static toProto(runCrawlReply: RunCrawlReply): RunCrawlReplyProto {
    const proto = new RunCrawlReplyProto();
    proto.setJobExecutionId(runCrawlReply.jobExecutionId);
    return proto;
  }
}
