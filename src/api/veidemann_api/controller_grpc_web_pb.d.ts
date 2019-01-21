import * as grpcWeb from 'grpc-web';
import {
  Empty,
  Timestamp,
  BrowserConfig,
  HeadersEntry,
  ScriptParametersEntry,
  BrowserConfigListReply,
  BrowserScript,
  BrowserScriptListReply,
  CrawlConfig,
  CrawlConfigListReply,
  CrawlEntity,
  CrawlEntityListReply,
  CrawlHostGroupConfig,
  IpRange,
  CrawlHostGroupConfigListReply,
  CrawlJob,
  CrawlJobListReply,
  CrawlLimitsConfig,
  CrawlScheduleConfig,
  CrawlScheduleConfigListReply,
  CrawlScope,
  ExtraConfig,
  GetRequest,
  Label,
  ListRequest,
  LogLevels,
  LogLevel,
  Meta,
  OpenIdConnectIssuerReply,
  PolitenessConfig,
  PolitenessConfigListReply,
  RoleList,
  RoleMapping,
  RoleMappingsListReply,
  RoleMappingsListRequest,
  RunCrawlReply,
  RunCrawlRequest,
  Seed,
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
               response: CrawlEntity) => void
  ): grpcWeb.ClientReadableStream<CrawlEntity>;

  listCrawlEntities(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlEntityListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlEntityListReply>;

  saveEntity(
    request: CrawlEntity,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlEntity) => void
  ): grpcWeb.ClientReadableStream<CrawlEntity>;

  deleteEntity(
    request: CrawlEntity,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  getSeed(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Seed) => void
  ): grpcWeb.ClientReadableStream<Seed>;

  listSeeds(
    request: SeedListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: SeedListReply) => void
  ): grpcWeb.ClientReadableStream<SeedListReply>;

  saveSeed(
    request: Seed,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Seed) => void
  ): grpcWeb.ClientReadableStream<Seed>;

  deleteSeed(
    request: Seed,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  getCrawlJob(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlJob) => void
  ): grpcWeb.ClientReadableStream<CrawlJob>;

  listCrawlJobs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlJobListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlJobListReply>;

  saveCrawlJob(
    request: CrawlJob,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlJob) => void
  ): grpcWeb.ClientReadableStream<CrawlJob>;

  deleteCrawlJob(
    request: CrawlJob,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  getCrawlConfig(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlConfig) => void
  ): grpcWeb.ClientReadableStream<CrawlConfig>;

  listCrawlConfigs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlConfigListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlConfigListReply>;

  saveCrawlConfig(
    request: CrawlConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlConfig) => void
  ): grpcWeb.ClientReadableStream<CrawlConfig>;

  deleteCrawlConfig(
    request: CrawlConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  getCrawlScheduleConfig(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlScheduleConfig) => void
  ): grpcWeb.ClientReadableStream<CrawlScheduleConfig>;

  listCrawlScheduleConfigs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlScheduleConfigListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlScheduleConfigListReply>;

  saveCrawlScheduleConfig(
    request: CrawlScheduleConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlScheduleConfig) => void
  ): grpcWeb.ClientReadableStream<CrawlScheduleConfig>;

  deleteCrawlScheduleConfig(
    request: CrawlScheduleConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  getPolitenessConfig(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: PolitenessConfig) => void
  ): grpcWeb.ClientReadableStream<PolitenessConfig>;

  listPolitenessConfigs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: PolitenessConfigListReply) => void
  ): grpcWeb.ClientReadableStream<PolitenessConfigListReply>;

  savePolitenessConfig(
    request: PolitenessConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: PolitenessConfig) => void
  ): grpcWeb.ClientReadableStream<PolitenessConfig>;

  deletePolitenessConfig(
    request: PolitenessConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  getBrowserConfig(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: BrowserConfig) => void
  ): grpcWeb.ClientReadableStream<BrowserConfig>;

  listBrowserConfigs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: BrowserConfigListReply) => void
  ): grpcWeb.ClientReadableStream<BrowserConfigListReply>;

  saveBrowserConfig(
    request: BrowserConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: BrowserConfig) => void
  ): grpcWeb.ClientReadableStream<BrowserConfig>;

  deleteBrowserConfig(
    request: BrowserConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  getBrowserScript(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: BrowserScript) => void
  ): grpcWeb.ClientReadableStream<BrowserScript>;

  listBrowserScripts(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: BrowserScriptListReply) => void
  ): grpcWeb.ClientReadableStream<BrowserScriptListReply>;

  saveBrowserScript(
    request: BrowserScript,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: BrowserScript) => void
  ): grpcWeb.ClientReadableStream<BrowserScript>;

  deleteBrowserScript(
    request: BrowserScript,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  getCrawlHostGroupConfig(
    request: GetRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlHostGroupConfig) => void
  ): grpcWeb.ClientReadableStream<CrawlHostGroupConfig>;

  listCrawlHostGroupConfigs(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlHostGroupConfigListReply) => void
  ): grpcWeb.ClientReadableStream<CrawlHostGroupConfigListReply>;

  saveCrawlHostGroupConfig(
    request: CrawlHostGroupConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlHostGroupConfig) => void
  ): grpcWeb.ClientReadableStream<CrawlHostGroupConfig>;

  deleteCrawlHostGroupConfig(
    request: CrawlHostGroupConfig,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  getLogConfig(
    request: Empty,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: LogLevels) => void
  ): grpcWeb.ClientReadableStream<LogLevels>;

  saveLogConfig(
    request: LogLevels,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: LogLevels) => void
  ): grpcWeb.ClientReadableStream<LogLevels>;

  listRoleMappings(
    request: RoleMappingsListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: RoleMappingsListReply) => void
  ): grpcWeb.ClientReadableStream<RoleMappingsListReply>;

  saveRoleMapping(
    request: RoleMapping,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: RoleMapping) => void
  ): grpcWeb.ClientReadableStream<RoleMapping>;

  deleteRoleMapping(
    request: RoleMapping,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Empty) => void
  ): grpcWeb.ClientReadableStream<Empty>;

  getRolesForActiveUser(
    request: Empty,
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
    request: Empty,
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
  ): Promise<CrawlEntity>;

  listCrawlEntities(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlEntityListReply>;

  saveEntity(
    request: CrawlEntity,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlEntity>;

  deleteEntity(
    request: CrawlEntity,
    metadata?: grpcWeb.Metadata
  ): Promise<Empty>;

  getSeed(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<Seed>;

  listSeeds(
    request: SeedListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<SeedListReply>;

  saveSeed(
    request: Seed,
    metadata?: grpcWeb.Metadata
  ): Promise<Seed>;

  deleteSeed(
    request: Seed,
    metadata?: grpcWeb.Metadata
  ): Promise<Empty>;

  getCrawlJob(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlJob>;

  listCrawlJobs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlJobListReply>;

  saveCrawlJob(
    request: CrawlJob,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlJob>;

  deleteCrawlJob(
    request: CrawlJob,
    metadata?: grpcWeb.Metadata
  ): Promise<Empty>;

  getCrawlConfig(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlConfig>;

  listCrawlConfigs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlConfigListReply>;

  saveCrawlConfig(
    request: CrawlConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlConfig>;

  deleteCrawlConfig(
    request: CrawlConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<Empty>;

  getCrawlScheduleConfig(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlScheduleConfig>;

  listCrawlScheduleConfigs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlScheduleConfigListReply>;

  saveCrawlScheduleConfig(
    request: CrawlScheduleConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlScheduleConfig>;

  deleteCrawlScheduleConfig(
    request: CrawlScheduleConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<Empty>;

  getPolitenessConfig(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<PolitenessConfig>;

  listPolitenessConfigs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<PolitenessConfigListReply>;

  savePolitenessConfig(
    request: PolitenessConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<PolitenessConfig>;

  deletePolitenessConfig(
    request: PolitenessConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<Empty>;

  getBrowserConfig(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<BrowserConfig>;

  listBrowserConfigs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<BrowserConfigListReply>;

  saveBrowserConfig(
    request: BrowserConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<BrowserConfig>;

  deleteBrowserConfig(
    request: BrowserConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<Empty>;

  getBrowserScript(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<BrowserScript>;

  listBrowserScripts(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<BrowserScriptListReply>;

  saveBrowserScript(
    request: BrowserScript,
    metadata?: grpcWeb.Metadata
  ): Promise<BrowserScript>;

  deleteBrowserScript(
    request: BrowserScript,
    metadata?: grpcWeb.Metadata
  ): Promise<Empty>;

  getCrawlHostGroupConfig(
    request: GetRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlHostGroupConfig>;

  listCrawlHostGroupConfigs(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlHostGroupConfigListReply>;

  saveCrawlHostGroupConfig(
    request: CrawlHostGroupConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlHostGroupConfig>;

  deleteCrawlHostGroupConfig(
    request: CrawlHostGroupConfig,
    metadata?: grpcWeb.Metadata
  ): Promise<Empty>;

  getLogConfig(
    request: Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<LogLevels>;

  saveLogConfig(
    request: LogLevels,
    metadata?: grpcWeb.Metadata
  ): Promise<LogLevels>;

  listRoleMappings(
    request: RoleMappingsListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<RoleMappingsListReply>;

  saveRoleMapping(
    request: RoleMapping,
    metadata?: grpcWeb.Metadata
  ): Promise<RoleMapping>;

  deleteRoleMapping(
    request: RoleMapping,
    metadata?: grpcWeb.Metadata
  ): Promise<Empty>;

  getRolesForActiveUser(
    request: Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<RoleList>;

  runCrawl(
    request: RunCrawlRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<RunCrawlReply>;

  getOpenIdConnectIssuer(
    request: Empty,
    metadata?: grpcWeb.Metadata
  ): Promise<OpenIdConnectIssuerReply>;

}

