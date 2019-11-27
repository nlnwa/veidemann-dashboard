import * as grpcWeb from 'grpc-web';

import * as controller_v1_resources_pb from '../../controller/v1/resources_pb';
import * as frontier_v1_resources_pb from '../../frontier/v1/resources_pb';
import * as config_v1_resources_pb from '../../config/v1/resources_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

import {
  CrawlerStatus,
  OpenIdConnectIssuerReply,
  RoleList,
  RunCrawlReply,
  RunCrawlRequest} from './controller_pb';

export class ControllerClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  getRolesForActiveUser(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: RoleList) => void
  ): grpcWeb.ClientReadableStream<RoleList>;

  runCrawl(
    request: RunCrawlRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: RunCrawlReply) => void
  ): grpcWeb.ClientReadableStream<RunCrawlReply>;

  abortCrawlExecution(
    request: controller_v1_resources_pb.ExecutionId,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: frontier_v1_resources_pb.CrawlExecutionStatus) => void
  ): grpcWeb.ClientReadableStream<frontier_v1_resources_pb.CrawlExecutionStatus>;

  abortJobExecution(
    request: controller_v1_resources_pb.ExecutionId,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: frontier_v1_resources_pb.JobExecutionStatus) => void
  ): grpcWeb.ClientReadableStream<frontier_v1_resources_pb.JobExecutionStatus>;

  getOpenIdConnectIssuer(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: OpenIdConnectIssuerReply) => void
  ): grpcWeb.ClientReadableStream<OpenIdConnectIssuerReply>;

  pauseCrawler(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  unPauseCrawler(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  status(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlerStatus) => void
  ): grpcWeb.ClientReadableStream<CrawlerStatus>;

}

export class ControllerPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  getRolesForActiveUser(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<RoleList>;

  runCrawl(
    request: RunCrawlRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<RunCrawlReply>;

  abortCrawlExecution(
    request: controller_v1_resources_pb.ExecutionId,
    metadata?: grpcWeb.Metadata
  ): Promise<frontier_v1_resources_pb.CrawlExecutionStatus>;

  abortJobExecution(
    request: controller_v1_resources_pb.ExecutionId,
    metadata?: grpcWeb.Metadata
  ): Promise<frontier_v1_resources_pb.JobExecutionStatus>;

  getOpenIdConnectIssuer(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<OpenIdConnectIssuerReply>;

  pauseCrawler(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  unPauseCrawler(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  status(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlerStatus>;

}

