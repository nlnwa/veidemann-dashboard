import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as log_v1_resources_pb from '../../log/v1/resources_pb';
import * as log_v1_log_pb from '../../log/v1/log_pb';


export class LogClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listCrawlLogs(
    request: log_v1_log_pb.CrawlLogListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<log_v1_resources_pb.CrawlLog>;

  listPageLogs(
    request: log_v1_log_pb.PageLogListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<log_v1_resources_pb.PageLog>;

}

export class LogPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listCrawlLogs(
    request: log_v1_log_pb.CrawlLogListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<log_v1_resources_pb.CrawlLog>;

  listPageLogs(
    request: log_v1_log_pb.PageLogListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<log_v1_resources_pb.PageLog>;

}

