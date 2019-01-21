import * as grpcWeb from 'grpc-web';
import {
  Timestamp,
  ExecutionId,
  ExecutionsListReply,
  JobExecutionsListReply,
  ListExecutionsRequest,
  ListJobExecutionsRequest,
  RunningExecutionsListReply,
  RunningExecutionsRequest,
  StatusDetail,
  Error,
  CrawlScope,
  CrawlExecutionStatus,
  JobExecutionStatus,
  ExecutionsStateEntry} from './status_pb';

export class StatusClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getRunningExecutions(
    request: RunningExecutionsRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<RunningExecutionsListReply>;

  getExecution(
    request: ExecutionId,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlExecutionStatus) => void
  ): grpcWeb.ClientReadableStream<CrawlExecutionStatus>;

  listExecutions(
    request: ListExecutionsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ExecutionsListReply) => void
  ): grpcWeb.ClientReadableStream<ExecutionsListReply>;

  abortExecution(
    request: ExecutionId,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlExecutionStatus) => void
  ): grpcWeb.ClientReadableStream<CrawlExecutionStatus>;

  getJobExecution(
    request: ExecutionId,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: JobExecutionStatus) => void
  ): grpcWeb.ClientReadableStream<JobExecutionStatus>;

  listJobExecutions(
    request: ListJobExecutionsRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: JobExecutionsListReply) => void
  ): grpcWeb.ClientReadableStream<JobExecutionsListReply>;

  abortJobExecution(
    request: ExecutionId,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: JobExecutionStatus) => void
  ): grpcWeb.ClientReadableStream<JobExecutionStatus>;

}

export class StatusPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getRunningExecutions(
    request: RunningExecutionsRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<RunningExecutionsListReply>;

  getExecution(
    request: ExecutionId,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlExecutionStatus>;

  listExecutions(
    request: ListExecutionsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ExecutionsListReply>;

  abortExecution(
    request: ExecutionId,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlExecutionStatus>;

  getJobExecution(
    request: ExecutionId,
    metadata?: grpcWeb.Metadata
  ): Promise<JobExecutionStatus>;

  listJobExecutions(
    request: ListJobExecutionsRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<JobExecutionsListReply>;

  abortJobExecution(
    request: ExecutionId,
    metadata?: grpcWeb.Metadata
  ): Promise<JobExecutionStatus>;

}

