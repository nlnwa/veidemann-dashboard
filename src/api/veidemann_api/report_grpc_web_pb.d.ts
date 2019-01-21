import * as grpcWeb from 'grpc-web';
import {
  Timestamp,
  CrawlLogListReply,
  CrawlLogListRequest,
  ExecuteDbQueryReply,
  ExecuteDbQueryRequest,
  Filter,
  PageLogListReply,
  PageLogListRequest,
  Screenshot,
  ScreenshotListReply,
  ScreenshotListRequest,
  Error,
  CrawlLog,
  PageLog,
  Resource} from './report_pb';

export class ReportClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  listCrawlLogs(
    request: CrawlLogListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlLogListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlLogListReply>;

  listPageLogs(
    request: PageLogListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: PageLogListReply) => void
  ): grpcWeb.ClientReadableStream<PageLogListReply>;

  listScreenshots(
    request: ScreenshotListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ScreenshotListReply) => void
  ): grpcWeb.ClientReadableStream<ScreenshotListReply>;

  executeDbQuery(
    request: ExecuteDbQueryRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<ExecuteDbQueryReply>;

}

export class ReportPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  listCrawlLogs(
    request: CrawlLogListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlLogListReply>;

  listPageLogs(
    request: PageLogListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<PageLogListReply>;

  listScreenshots(
    request: ScreenshotListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ScreenshotListReply>;

  executeDbQuery(
    request: ExecuteDbQueryRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<ExecuteDbQueryReply>;

}

