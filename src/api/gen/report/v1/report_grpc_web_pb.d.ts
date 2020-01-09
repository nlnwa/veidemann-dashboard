import * as grpcWeb from 'grpc-web';

import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as frontier_v1_resources_pb from '../../frontier/v1/resources_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

import {
  CrawlExecutionsListRequest,
  CrawlLogListRequest,
  ExecuteDbQueryReply,
  ExecuteDbQueryRequest,
  JobExecutionsListRequest,
  ListCountResponse,
  PageLogListRequest} from './report_pb';

export class ReportClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  listCrawlLogs(
    request: CrawlLogListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<frontier_v1_resources_pb.CrawlLog>;

  countCrawlLogs(
    request: CrawlLogListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ListCountResponse) => void
  ): grpcWeb.ClientReadableStream<ListCountResponse>;

  listPageLogs(
    request: PageLogListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<frontier_v1_resources_pb.PageLog>;

  countPageLogs(
    request: PageLogListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ListCountResponse) => void
  ): grpcWeb.ClientReadableStream<ListCountResponse>;

  executeDbQuery(
    request: ExecuteDbQueryRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<ExecuteDbQueryReply>;

  listExecutions(
    request: CrawlExecutionsListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<frontier_v1_resources_pb.CrawlExecutionStatus>;

  listJobExecutions(
    request: JobExecutionsListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<frontier_v1_resources_pb.JobExecutionStatus>;

}

export class ReportPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  listCrawlLogs(
    request: CrawlLogListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<frontier_v1_resources_pb.CrawlLog>;

  countCrawlLogs(
    request: CrawlLogListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ListCountResponse>;

  listPageLogs(
    request: PageLogListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<frontier_v1_resources_pb.PageLog>;

  countPageLogs(
    request: PageLogListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ListCountResponse>;

  executeDbQuery(
    request: ExecuteDbQueryRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<ExecuteDbQueryReply>;

  listExecutions(
    request: CrawlExecutionsListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<frontier_v1_resources_pb.CrawlExecutionStatus>;

  listJobExecutions(
    request: JobExecutionsListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<frontier_v1_resources_pb.JobExecutionStatus>;

}

