import * as grpcWeb from 'grpc-web';

import * as veidemann_api_config_pb from '../veidemann_api/config_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_api_annotations_pb from '../google/api/annotations_pb';
import * as protoc$gen$swagger_options_annotations_pb from '../protoc-gen-swagger/options/annotations_pb';

import {
  BrowserConfigListReply,
  BrowserScriptListReply,
  CrawlConfigListReply,
  CrawlEntityListReply,
  CrawlHostGroupConfigListReply,
  CrawlJobListReply,
  CrawlScheduleConfigListReply,
  GetRequest,
  ListRequest,
  OpenIdConnectIssuerReply,
  PolitenessConfigListReply,
  RoleList,
  RoleMappingsListReply,
  RoleMappingsListRequest,
  RunCrawlReply,
  RunCrawlRequest,
  SeedListReply,
  SeedListRequest} from './controller_pb';

export class ControllerClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getCrawlEntity(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.CrawlEntity) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.CrawlEntity>;

  listCrawlEntities(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlEntityListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlEntityListReply>;

  saveEntity(
    request: veidemann_api_config_pb.CrawlEntity,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.CrawlEntity) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.CrawlEntity>;

  deleteEntity(
    request: veidemann_api_config_pb.CrawlEntity,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getSeed(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.Seed) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.Seed>;

  listSeeds(
    request: SeedListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: SeedListReply) => void
  ): grpcWeb.ClientReadableStream<SeedListReply>;

  saveSeed(
    request: veidemann_api_config_pb.Seed,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.Seed) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.Seed>;

  deleteSeed(
    request: veidemann_api_config_pb.Seed,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getCrawlJob(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.CrawlJob) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.CrawlJob>;

  listCrawlJobs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlJobListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlJobListReply>;

  saveCrawlJob(
    request: veidemann_api_config_pb.CrawlJob,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.CrawlJob) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.CrawlJob>;

  deleteCrawlJob(
    request: veidemann_api_config_pb.CrawlJob,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getCrawlConfig(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.CrawlConfig) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.CrawlConfig>;

  listCrawlConfigs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlConfigListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlConfigListReply>;

  saveCrawlConfig(
    request: veidemann_api_config_pb.CrawlConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.CrawlConfig) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.CrawlConfig>;

  deleteCrawlConfig(
    request: veidemann_api_config_pb.CrawlConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getCrawlScheduleConfig(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.CrawlScheduleConfig) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.CrawlScheduleConfig>;

  listCrawlScheduleConfigs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlScheduleConfigListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlScheduleConfigListReply>;

  saveCrawlScheduleConfig(
    request: veidemann_api_config_pb.CrawlScheduleConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.CrawlScheduleConfig) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.CrawlScheduleConfig>;

  deleteCrawlScheduleConfig(
    request: veidemann_api_config_pb.CrawlScheduleConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getPolitenessConfig(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.PolitenessConfig) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.PolitenessConfig>;

  listPolitenessConfigs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: PolitenessConfigListReply) => void
  ): grpcWeb.ClientReadableStream<PolitenessConfigListReply>;

  savePolitenessConfig(
    request: veidemann_api_config_pb.PolitenessConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.PolitenessConfig) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.PolitenessConfig>;

  deletePolitenessConfig(
    request: veidemann_api_config_pb.PolitenessConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getBrowserConfig(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.BrowserConfig) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.BrowserConfig>;

  listBrowserConfigs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: BrowserConfigListReply) => void
  ): grpcWeb.ClientReadableStream<BrowserConfigListReply>;

  saveBrowserConfig(
    request: veidemann_api_config_pb.BrowserConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.BrowserConfig) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.BrowserConfig>;

  deleteBrowserConfig(
    request: veidemann_api_config_pb.BrowserConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getBrowserScript(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.BrowserScript) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.BrowserScript>;

  listBrowserScripts(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: BrowserScriptListReply) => void
  ): grpcWeb.ClientReadableStream<BrowserScriptListReply>;

  saveBrowserScript(
    request: veidemann_api_config_pb.BrowserScript,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.BrowserScript) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.BrowserScript>;

  deleteBrowserScript(
    request: veidemann_api_config_pb.BrowserScript,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getCrawlHostGroupConfig(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.CrawlHostGroupConfig) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.CrawlHostGroupConfig>;

  listCrawlHostGroupConfigs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlHostGroupConfigListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlHostGroupConfigListReply>;

  saveCrawlHostGroupConfig(
    request: veidemann_api_config_pb.CrawlHostGroupConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.CrawlHostGroupConfig) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.CrawlHostGroupConfig>;

  deleteCrawlHostGroupConfig(
    request: veidemann_api_config_pb.CrawlHostGroupConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  getLogConfig(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.LogLevels) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.LogLevels>;

  saveLogConfig(
    request: veidemann_api_config_pb.LogLevels,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.LogLevels) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.LogLevels>;

  listRoleMappings(
    request: RoleMappingsListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: RoleMappingsListReply) => void
  ): grpcWeb.ClientReadableStream<RoleMappingsListReply>;

  saveRoleMapping(
    request: veidemann_api_config_pb.RoleMapping,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: veidemann_api_config_pb.RoleMapping) => void
  ): grpcWeb.ClientReadableStream<veidemann_api_config_pb.RoleMapping>;

  deleteRoleMapping(
    request: veidemann_api_config_pb.RoleMapping,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: google_protobuf_empty_pb.Empty) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

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

  getOpenIdConnectIssuer(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: OpenIdConnectIssuerReply) => void
  ): grpcWeb.ClientReadableStream<OpenIdConnectIssuerReply>;

}

export class ControllerPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getCrawlEntity(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.CrawlEntity>;

  listCrawlEntities(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlEntityListReply>;

  saveEntity(
    request: veidemann_api_config_pb.CrawlEntity,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.CrawlEntity>;

  deleteEntity(
    request: veidemann_api_config_pb.CrawlEntity,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getSeed(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.Seed>;

  listSeeds(
    request: SeedListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<SeedListReply>;

  saveSeed(
    request: veidemann_api_config_pb.Seed,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.Seed>;

  deleteSeed(
    request: veidemann_api_config_pb.Seed,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getCrawlJob(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.CrawlJob>;

  listCrawlJobs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlJobListReply>;

  saveCrawlJob(
    request: veidemann_api_config_pb.CrawlJob,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.CrawlJob>;

  deleteCrawlJob(
    request: veidemann_api_config_pb.CrawlJob,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getCrawlConfig(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.CrawlConfig>;

  listCrawlConfigs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlConfigListReply>;

  saveCrawlConfig(
    request: veidemann_api_config_pb.CrawlConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.CrawlConfig>;

  deleteCrawlConfig(
    request: veidemann_api_config_pb.CrawlConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getCrawlScheduleConfig(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.CrawlScheduleConfig>;

  listCrawlScheduleConfigs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlScheduleConfigListReply>;

  saveCrawlScheduleConfig(
    request: veidemann_api_config_pb.CrawlScheduleConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.CrawlScheduleConfig>;

  deleteCrawlScheduleConfig(
    request: veidemann_api_config_pb.CrawlScheduleConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getPolitenessConfig(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.PolitenessConfig>;

  listPolitenessConfigs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<PolitenessConfigListReply>;

  savePolitenessConfig(
    request: veidemann_api_config_pb.PolitenessConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.PolitenessConfig>;

  deletePolitenessConfig(
    request: veidemann_api_config_pb.PolitenessConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getBrowserConfig(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.BrowserConfig>;

  listBrowserConfigs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<BrowserConfigListReply>;

  saveBrowserConfig(
    request: veidemann_api_config_pb.BrowserConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.BrowserConfig>;

  deleteBrowserConfig(
    request: veidemann_api_config_pb.BrowserConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getBrowserScript(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.BrowserScript>;

  listBrowserScripts(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<BrowserScriptListReply>;

  saveBrowserScript(
    request: veidemann_api_config_pb.BrowserScript,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.BrowserScript>;

  deleteBrowserScript(
    request: veidemann_api_config_pb.BrowserScript,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getCrawlHostGroupConfig(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.CrawlHostGroupConfig>;

  listCrawlHostGroupConfigs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlHostGroupConfigListReply>;

  saveCrawlHostGroupConfig(
    request: veidemann_api_config_pb.CrawlHostGroupConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.CrawlHostGroupConfig>;

  deleteCrawlHostGroupConfig(
    request: veidemann_api_config_pb.CrawlHostGroupConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getLogConfig(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.LogLevels>;

  saveLogConfig(
    request: veidemann_api_config_pb.LogLevels,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.LogLevels>;

  listRoleMappings(
    request: RoleMappingsListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<RoleMappingsListReply>;

  saveRoleMapping(
    request: veidemann_api_config_pb.RoleMapping,
    metadata?: grpcWeb.Metadata
  ): Promise<veidemann_api_config_pb.RoleMapping>;

  deleteRoleMapping(
    request: veidemann_api_config_pb.RoleMapping,
    metadata?: grpcWeb.Metadata
  ): Promise<google_protobuf_empty_pb.Empty>;

  getRolesForActiveUser(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<RoleList>;

  runCrawl(
    request: RunCrawlRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<RunCrawlReply>;

  getOpenIdConnectIssuer(
    request: google_protobuf_empty_pb.Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<OpenIdConnectIssuerReply>;

}

