export class Empty {
  constructor ();
  toObject(): Empty.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class Timestamp {
  constructor ();
  getSeconds(): number;
  setSeconds(a: number): void;
  getNanos(): number;
  setNanos(a: number): void;
  toObject(): Timestamp.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Timestamp;
}

export namespace Timestamp {
  export type AsObject = {
    seconds: number;
    nanos: number;
  }
}

export class BrowserConfig {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getMeta(): Meta;
  setMeta(a: Meta): void;
  getUserAgent(): string;
  setUserAgent(a: string): void;
  getWindowWidth(): number;
  setWindowWidth(a: number): void;
  getWindowHeight(): number;
  setWindowHeight(a: number): void;
  getPageLoadTimeoutMs(): number;
  setPageLoadTimeoutMs(a: number): void;
  getScriptSelectorList(): string[];
  setScriptSelectorList(a: string[]): void;
  getScriptIdList(): string[];
  setScriptIdList(a: string[]): void;
  getHeadersList(): BrowserConfig.HeadersEntry[];
  setHeadersList(a: BrowserConfig.HeadersEntry[]): void;
  getScriptParametersList(): BrowserConfig.ScriptParametersEntry[];
  setScriptParametersList(a: BrowserConfig.ScriptParametersEntry[]): void;
  getSleepAfterPageloadMs(): number;
  setSleepAfterPageloadMs(a: number): void;
  toObject(): BrowserConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => BrowserConfig;
}

export namespace BrowserConfig {
  export type AsObject = {
    id: string;
    meta: Meta;
    userAgent: string;
    windowWidth: number;
    windowHeight: number;
    pageLoadTimeoutMs: number;
    scriptSelectorList: string[];
    scriptIdList: string[];
    headersList: BrowserConfig.HeadersEntry[];
    scriptParametersList: BrowserConfig.ScriptParametersEntry[];
    sleepAfterPageloadMs: number;
  }
  export type HeadersEntry = BrowserConfigHeadersEntry;
  export type ScriptParametersEntry = BrowserConfigScriptParametersEntry;
}

export class BrowserConfigHeadersEntry {
  constructor ();
  getKey(): string;
  setKey(a: string): void;
  getValue(): string;
  setValue(a: string): void;
  toObject(): BrowserConfigHeadersEntry.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => BrowserConfigHeadersEntry;
}

export namespace BrowserConfigHeadersEntry {
  export type AsObject = {
    key: string;
    value: string;
  }
}

export class BrowserConfigScriptParametersEntry {
  constructor ();
  getKey(): string;
  setKey(a: string): void;
  getValue(): string;
  setValue(a: string): void;
  toObject(): BrowserConfigScriptParametersEntry.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => BrowserConfigScriptParametersEntry;
}

export namespace BrowserConfigScriptParametersEntry {
  export type AsObject = {
    key: string;
    value: string;
  }
}

export class HeadersEntry {
  constructor ();
  getKey(): string;
  setKey(a: string): void;
  getValue(): string;
  setValue(a: string): void;
  toObject(): HeadersEntry.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => HeadersEntry;
}

export namespace HeadersEntry {
  export type AsObject = {
    key: string;
    value: string;
  }
}

export class ScriptParametersEntry {
  constructor ();
  getKey(): string;
  setKey(a: string): void;
  getValue(): string;
  setValue(a: string): void;
  toObject(): ScriptParametersEntry.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ScriptParametersEntry;
}

export namespace ScriptParametersEntry {
  export type AsObject = {
    key: string;
    value: string;
  }
}

export class BrowserConfigListReply {
  constructor ();
  getValueList(): BrowserConfig[];
  setValueList(a: BrowserConfig[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): BrowserConfigListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => BrowserConfigListReply;
}

export namespace BrowserConfigListReply {
  export type AsObject = {
    valueList: BrowserConfig[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class BrowserScript {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getMeta(): Meta;
  setMeta(a: Meta): void;
  getScript(): string;
  setScript(a: string): void;
  getUrlRegexp(): string;
  setUrlRegexp(a: string): void;
  toObject(): BrowserScript.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => BrowserScript;
}

export namespace BrowserScript {
  export type AsObject = {
    id: string;
    meta: Meta;
    script: string;
    urlRegexp: string;
  }
}

export class BrowserScriptListReply {
  constructor ();
  getValueList(): BrowserScript[];
  setValueList(a: BrowserScript[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): BrowserScriptListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => BrowserScriptListReply;
}

export namespace BrowserScriptListReply {
  export type AsObject = {
    valueList: BrowserScript[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class CrawlConfig {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getMeta(): Meta;
  setMeta(a: Meta): void;
  getBrowserConfigId(): string;
  setBrowserConfigId(a: string): void;
  getPolitenessId(): string;
  setPolitenessId(a: string): void;
  getExtra(): ExtraConfig;
  setExtra(a: ExtraConfig): void;
  getMinimumDnsTtlS(): number;
  setMinimumDnsTtlS(a: number): void;
  getPriorityWeight(): number;
  setPriorityWeight(a: number): void;
  getDepthFirst(): boolean;
  setDepthFirst(a: boolean): void;
  toObject(): CrawlConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlConfig;
}

export namespace CrawlConfig {
  export type AsObject = {
    id: string;
    meta: Meta;
    browserConfigId: string;
    politenessId: string;
    extra: ExtraConfig;
    minimumDnsTtlS: number;
    priorityWeight: number;
    depthFirst: boolean;
  }
}

export class CrawlConfigListReply {
  constructor ();
  getValueList(): CrawlConfig[];
  setValueList(a: CrawlConfig[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): CrawlConfigListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlConfigListReply;
}

export namespace CrawlConfigListReply {
  export type AsObject = {
    valueList: CrawlConfig[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class CrawlEntity {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getMeta(): Meta;
  setMeta(a: Meta): void;
  toObject(): CrawlEntity.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlEntity;
}

export namespace CrawlEntity {
  export type AsObject = {
    id: string;
    meta: Meta;
  }
}

export class CrawlEntityListReply {
  constructor ();
  getValueList(): CrawlEntity[];
  setValueList(a: CrawlEntity[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): CrawlEntityListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlEntityListReply;
}

export namespace CrawlEntityListReply {
  export type AsObject = {
    valueList: CrawlEntity[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class CrawlHostGroupConfig {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getMeta(): Meta;
  setMeta(a: Meta): void;
  getIpRangeList(): CrawlHostGroupConfig.IpRange[];
  setIpRangeList(a: CrawlHostGroupConfig.IpRange[]): void;
  toObject(): CrawlHostGroupConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlHostGroupConfig;
}

export namespace CrawlHostGroupConfig {
  export type AsObject = {
    id: string;
    meta: Meta;
    ipRangeList: CrawlHostGroupConfig.IpRange[];
  }
  export type IpRange = CrawlHostGroupConfigIpRange;
}

export class CrawlHostGroupConfigIpRange {
  constructor ();
  getIpFrom(): string;
  setIpFrom(a: string): void;
  getIpTo(): string;
  setIpTo(a: string): void;
  toObject(): CrawlHostGroupConfigIpRange.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlHostGroupConfigIpRange;
}

export namespace CrawlHostGroupConfigIpRange {
  export type AsObject = {
    ipFrom: string;
    ipTo: string;
  }
}

export class IpRange {
  constructor ();
  getIpFrom(): string;
  setIpFrom(a: string): void;
  getIpTo(): string;
  setIpTo(a: string): void;
  toObject(): IpRange.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => IpRange;
}

export namespace IpRange {
  export type AsObject = {
    ipFrom: string;
    ipTo: string;
  }
}

export class CrawlHostGroupConfigListReply {
  constructor ();
  getValueList(): CrawlHostGroupConfig[];
  setValueList(a: CrawlHostGroupConfig[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): CrawlHostGroupConfigListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlHostGroupConfigListReply;
}

export namespace CrawlHostGroupConfigListReply {
  export type AsObject = {
    valueList: CrawlHostGroupConfig[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class CrawlJob {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getMeta(): Meta;
  setMeta(a: Meta): void;
  getScheduleId(): string;
  setScheduleId(a: string): void;
  getLimits(): CrawlLimitsConfig;
  setLimits(a: CrawlLimitsConfig): void;
  getCrawlConfigId(): string;
  setCrawlConfigId(a: string): void;
  getDisabled(): boolean;
  setDisabled(a: boolean): void;
  toObject(): CrawlJob.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlJob;
}

export namespace CrawlJob {
  export type AsObject = {
    id: string;
    meta: Meta;
    scheduleId: string;
    limits: CrawlLimitsConfig;
    crawlConfigId: string;
    disabled: boolean;
  }
}

export class CrawlJobListReply {
  constructor ();
  getValueList(): CrawlJob[];
  setValueList(a: CrawlJob[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): CrawlJobListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlJobListReply;
}

export namespace CrawlJobListReply {
  export type AsObject = {
    valueList: CrawlJob[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class CrawlLimitsConfig {
  constructor ();
  getDepth(): number;
  setDepth(a: number): void;
  getMaxDurationS(): number;
  setMaxDurationS(a: number): void;
  getMaxBytes(): number;
  setMaxBytes(a: number): void;
  toObject(): CrawlLimitsConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlLimitsConfig;
}

export namespace CrawlLimitsConfig {
  export type AsObject = {
    depth: number;
    maxDurationS: number;
    maxBytes: number;
  }
}

export class CrawlScheduleConfig {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getMeta(): Meta;
  setMeta(a: Meta): void;
  getCronExpression(): string;
  setCronExpression(a: string): void;
  getValidFrom(): Timestamp;
  setValidFrom(a: Timestamp): void;
  getValidTo(): Timestamp;
  setValidTo(a: Timestamp): void;
  toObject(): CrawlScheduleConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlScheduleConfig;
}

export namespace CrawlScheduleConfig {
  export type AsObject = {
    id: string;
    meta: Meta;
    cronExpression: string;
    validFrom: Timestamp;
    validTo: Timestamp;
  }
}

export class CrawlScheduleConfigListReply {
  constructor ();
  getValueList(): CrawlScheduleConfig[];
  setValueList(a: CrawlScheduleConfig[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): CrawlScheduleConfigListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlScheduleConfigListReply;
}

export namespace CrawlScheduleConfigListReply {
  export type AsObject = {
    valueList: CrawlScheduleConfig[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class CrawlScope {
  constructor ();
  getSurtPrefix(): string;
  setSurtPrefix(a: string): void;
  toObject(): CrawlScope.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlScope;
}

export namespace CrawlScope {
  export type AsObject = {
    surtPrefix: string;
  }
}

export class ExtraConfig {
  constructor ();
  getExtractText(): boolean;
  setExtractText(a: boolean): void;
  getCreateSnapshot(): boolean;
  setCreateSnapshot(a: boolean): void;
  toObject(): ExtraConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ExtraConfig;
}

export namespace ExtraConfig {
  export type AsObject = {
    extractText: boolean;
    createSnapshot: boolean;
  }
}

export class GetRequest {
  constructor ();
  getId(): string;
  setId(a: string): void;
  toObject(): GetRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetRequest;
}

export namespace GetRequest {
  export type AsObject = {
    id: string;
  }
}

export class Label {
  constructor ();
  getKey(): string;
  setKey(a: string): void;
  getValue(): string;
  setValue(a: string): void;
  toObject(): Label.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Label;
}

export namespace Label {
  export type AsObject = {
    key: string;
    value: string;
  }
}

export class ListRequest {
  constructor ();
  getIdList(): string[];
  setIdList(a: string[]): void;
  getName(): string;
  setName(a: string): void;
  getLabelSelectorList(): string[];
  setLabelSelectorList(a: string[]): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): ListRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ListRequest;
}

export namespace ListRequest {
  export type AsObject = {
    idList: string[];
    name: string;
    labelSelectorList: string[];
    pageSize: number;
    page: number;
  }
}

export class LogLevels {
  constructor ();
  getLogLevelList(): LogLevels.LogLevel[];
  setLogLevelList(a: LogLevels.LogLevel[]): void;
  toObject(): LogLevels.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => LogLevels;
}

export namespace LogLevels {
  export type AsObject = {
    logLevelList: LogLevels.LogLevel[];
  }
  export type LogLevel = LogLevelsLogLevel;

  export enum Level { 
    UNDEFINED = 0,
    ALL = 1,
    TRACE = 2,
    DEBUG = 3,
    INFO = 4,
    WARN = 5,
    ERROR = 6,
    FATAL = 7,
    OFF = 8,
  }
}

export class LogLevelsLogLevel {
  constructor ();
  getLogger(): string;
  setLogger(a: string): void;
  getLevel(): LogLevels.Level;
  setLevel(a: LogLevels.Level): void;
  toObject(): LogLevelsLogLevel.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => LogLevelsLogLevel;
}

export namespace LogLevelsLogLevel {
  export type AsObject = {
    logger: string;
    level: LogLevels.Level;
  }
}

export class LogLevel {
  constructor ();
  getLogger(): string;
  setLogger(a: string): void;
  getLevel(): LogLevels.Level;
  setLevel(a: LogLevels.Level): void;
  toObject(): LogLevel.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => LogLevel;
}

export namespace LogLevel {
  export type AsObject = {
    logger: string;
    level: LogLevels.Level;
  }
}

export class Meta {
  constructor ();
  getName(): string;
  setName(a: string): void;
  getDescription(): string;
  setDescription(a: string): void;
  getCreated(): Timestamp;
  setCreated(a: Timestamp): void;
  getCreatedBy(): string;
  setCreatedBy(a: string): void;
  getLastModified(): Timestamp;
  setLastModified(a: Timestamp): void;
  getLastModifiedBy(): string;
  setLastModifiedBy(a: string): void;
  getLabelList(): Label[];
  setLabelList(a: Label[]): void;
  toObject(): Meta.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Meta;
}

export namespace Meta {
  export type AsObject = {
    name: string;
    description: string;
    created: Timestamp;
    createdBy: string;
    lastModified: Timestamp;
    lastModifiedBy: string;
    labelList: Label[];
  }
}

export class OpenIdConnectIssuerReply {
  constructor ();
  getOpenIdConnectIssuer(): string;
  setOpenIdConnectIssuer(a: string): void;
  toObject(): OpenIdConnectIssuerReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => OpenIdConnectIssuerReply;
}

export namespace OpenIdConnectIssuerReply {
  export type AsObject = {
    openIdConnectIssuer: string;
  }
}

export class PolitenessConfig {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getMeta(): Meta;
  setMeta(a: Meta): void;
  getRobotsPolicy(): PolitenessConfig.RobotsPolicy;
  setRobotsPolicy(a: PolitenessConfig.RobotsPolicy): void;
  getMinimumRobotsValidityDurationS(): number;
  setMinimumRobotsValidityDurationS(a: number): void;
  getCustomRobots(): string;
  setCustomRobots(a: string): void;
  getMinTimeBetweenPageLoadMs(): number;
  setMinTimeBetweenPageLoadMs(a: number): void;
  getMaxTimeBetweenPageLoadMs(): number;
  setMaxTimeBetweenPageLoadMs(a: number): void;
  getDelayFactor(): number;
  setDelayFactor(a: number): void;
  getMaxRetries(): number;
  setMaxRetries(a: number): void;
  getRetryDelaySeconds(): number;
  setRetryDelaySeconds(a: number): void;
  getCrawlHostGroupSelectorList(): string[];
  setCrawlHostGroupSelectorList(a: string[]): void;
  getUseHostname(): boolean;
  setUseHostname(a: boolean): void;
  toObject(): PolitenessConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => PolitenessConfig;
}

export namespace PolitenessConfig {
  export type AsObject = {
    id: string;
    meta: Meta;
    robotsPolicy: PolitenessConfig.RobotsPolicy;
    minimumRobotsValidityDurationS: number;
    customRobots: string;
    minTimeBetweenPageLoadMs: number;
    maxTimeBetweenPageLoadMs: number;
    delayFactor: number;
    maxRetries: number;
    retryDelaySeconds: number;
    crawlHostGroupSelectorList: string[];
    useHostname: boolean;
  }

  export enum RobotsPolicy { 
    OBEY_ROBOTS = 0,
    IGNORE_ROBOTS = 1,
    CUSTOM_ROBOTS = 2,
  }
}

export class PolitenessConfigListReply {
  constructor ();
  getValueList(): PolitenessConfig[];
  setValueList(a: PolitenessConfig[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): PolitenessConfigListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => PolitenessConfigListReply;
}

export namespace PolitenessConfigListReply {
  export type AsObject = {
    valueList: PolitenessConfig[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class RoleList {
  constructor ();
  getRoleList(): Role[];
  setRoleList(a: Role[]): void;
  toObject(): RoleList.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => RoleList;
}

export namespace RoleList {
  export type AsObject = {
    roleList: Role[];
  }
}

export class RoleMapping {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getEmail(): string;
  setEmail(a: string): void;
  getGroup(): string;
  setGroup(a: string): void;
  getRoleList(): Role[];
  setRoleList(a: Role[]): void;
  toObject(): RoleMapping.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => RoleMapping;
}

export namespace RoleMapping {
  export type AsObject = {
    id: string;
    email: string;
    group: string;
    roleList: Role[];
  }
}

export class RoleMappingsListReply {
  constructor ();
  getValueList(): RoleMapping[];
  setValueList(a: RoleMapping[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): RoleMappingsListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => RoleMappingsListReply;
}

export namespace RoleMappingsListReply {
  export type AsObject = {
    valueList: RoleMapping[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class RoleMappingsListRequest {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): RoleMappingsListRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => RoleMappingsListRequest;
}

export namespace RoleMappingsListRequest {
  export type AsObject = {
    id: string;
    pageSize: number;
    page: number;
  }
}

export class RunCrawlReply {
  constructor ();
  getJobExecutionId(): string;
  setJobExecutionId(a: string): void;
  toObject(): RunCrawlReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => RunCrawlReply;
}

export namespace RunCrawlReply {
  export type AsObject = {
    jobExecutionId: string;
  }
}

export class RunCrawlRequest {
  constructor ();
  getJobId(): string;
  setJobId(a: string): void;
  getSeedId(): string;
  setSeedId(a: string): void;
  toObject(): RunCrawlRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => RunCrawlRequest;
}

export namespace RunCrawlRequest {
  export type AsObject = {
    jobId: string;
    seedId: string;
  }
}

export class Seed {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getMeta(): Meta;
  setMeta(a: Meta): void;
  getEntityId(): string;
  setEntityId(a: string): void;
  getScope(): CrawlScope;
  setScope(a: CrawlScope): void;
  getJobIdList(): string[];
  setJobIdList(a: string[]): void;
  getDisabled(): boolean;
  setDisabled(a: boolean): void;
  toObject(): Seed.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Seed;
}

export namespace Seed {
  export type AsObject = {
    id: string;
    meta: Meta;
    entityId: string;
    scope: CrawlScope;
    jobIdList: string[];
    disabled: boolean;
  }
}

export class SeedListReply {
  constructor ();
  getValueList(): Seed[];
  setValueList(a: Seed[]): void;
  getCount(): number;
  setCount(a: number): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): SeedListReply.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => SeedListReply;
}

export namespace SeedListReply {
  export type AsObject = {
    valueList: Seed[];
    count: number;
    pageSize: number;
    page: number;
  }
}

export class SeedListRequest {
  constructor ();
  getIdList(): string[];
  setIdList(a: string[]): void;
  getName(): string;
  setName(a: string): void;
  getLabelSelectorList(): string[];
  setLabelSelectorList(a: string[]): void;
  getCrawlJobId(): string;
  setCrawlJobId(a: string): void;
  getEntityId(): string;
  setEntityId(a: string): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getPage(): number;
  setPage(a: number): void;
  toObject(): SeedListRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => SeedListRequest;
}

export namespace SeedListRequest {
  export type AsObject = {
    idList: string[];
    name: string;
    labelSelectorList: string[];
    crawlJobId: string;
    entityId: string;
    pageSize: number;
    page: number;
  }
}

export enum Role { 
  ANY_USER = 0,
  ANY = 1,
  ADMIN = 2,
  CURATOR = 3,
  READONLY = 4,
}
