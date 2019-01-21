export class Timestamp {
  constructor ();
  static deserializeBinary: (bytes: {}) => Timestamp;
  getSeconds(): number;
  setSeconds(a: number): void;
  getNanos(): number;
  setNanos(a: number): void;
  toObject(): Timestamp.AsObject;
  serializeBinary(): Uint8Array;
}

export namespace Timestamp {
  export type AsObject = {
    seconds: number;
    nanos: number;
  }
}

export class BrowserConfig {
  constructor ();
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
  getScriptRefList(): ConfigRef[];
  setScriptRefList(a: ConfigRef[]): void;
  getHeadersList(): BrowserConfig.HeadersEntry[];
  setHeadersList(a: BrowserConfig.HeadersEntry[]): void;
  getScriptParametersList(): BrowserConfig.ScriptParametersEntry[];
  setScriptParametersList(a: BrowserConfig.ScriptParametersEntry[]): void;
  getMaxInactivityTimeMs(): number;
  setMaxInactivityTimeMs(a: number): void;
  toObject(): BrowserConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => BrowserConfig;
}

export namespace BrowserConfig {
  export type AsObject = {
    userAgent: string;
    windowWidth: number;
    windowHeight: number;
    pageLoadTimeoutMs: number;
    scriptSelectorList: string[];
    scriptRefList: ConfigRef[];
    headersList: BrowserConfig.HeadersEntry[];
    scriptParametersList: BrowserConfig.ScriptParametersEntry[];
    maxInactivityTimeMs: number;
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

export class BrowserScript {
  constructor ();
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
    script: string;
    urlRegexp: string;
  }
}

export class Collection {
  constructor ();
  getCollectionDedupPolicy(): Collection.RotationPolicy;
  setCollectionDedupPolicy(a: Collection.RotationPolicy): void;
  getFileRotationPolicy(): Collection.RotationPolicy;
  setFileRotationPolicy(a: Collection.RotationPolicy): void;
  getCompress(): boolean;
  setCompress(a: boolean): void;
  getFileSize(): number;
  setFileSize(a: number): void;
  getSubCollectionsList(): Collection.SubCollection[];
  setSubCollectionsList(a: Collection.SubCollection[]): void;
  toObject(): Collection.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Collection;
}

export namespace Collection {
  export type AsObject = {
    collectionDedupPolicy: Collection.RotationPolicy;
    fileRotationPolicy: Collection.RotationPolicy;
    compress: boolean;
    fileSize: number;
    subCollectionsList: Collection.SubCollection[];
  }
  export type SubCollection = CollectionSubCollection;

  export enum RotationPolicy {
    NONE = 0,
    HOURLY = 1,
    DAILY = 2,
    MONTHLY = 3,
    YEARLY = 4,
  }

  export enum SubCollectionType {
    UNDEFINED = 0,
    SCREENSHOT = 1,
    DNS = 2,
  }
}

export class CollectionSubCollection {
  constructor ();
  getType(): Collection.SubCollectionType;
  setType(a: Collection.SubCollectionType): void;
  getName(): string;
  setName(a: string): void;
  toObject(): CollectionSubCollection.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CollectionSubCollection;
}

export namespace CollectionSubCollection {
  export type AsObject = {
    type: Collection.SubCollectionType;
    name: string;
  }
}

export class SubCollection {
  constructor ();
  getType(): Collection.SubCollectionType;
  setType(a: Collection.SubCollectionType): void;
  getName(): string;
  setName(a: string): void;
  toObject(): SubCollection.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => SubCollection;
}

export namespace SubCollection {
  export type AsObject = {
    type: Collection.SubCollectionType;
    name: string;
  }
}

export class ConfigObject {
  constructor ();
  getId(): string;
  setId(a: string): void;
  getApiversion(): string;
  setApiversion(a: string): void;
  getKind(): Kind;
  setKind(a: Kind): void;
  getMeta(): Meta;
  setMeta(a: Meta): void;
  getCrawlEntity(): CrawlEntity;
  setCrawlEntity(a: CrawlEntity): void;
  getSeed(): Seed;
  setSeed(a: Seed): void;
  getCrawlJob(): CrawlJob;
  setCrawlJob(a: CrawlJob): void;
  getCrawlConfig(): CrawlConfig;
  setCrawlConfig(a: CrawlConfig): void;
  getCrawlScheduleConfig(): CrawlScheduleConfig;
  setCrawlScheduleConfig(a: CrawlScheduleConfig): void;
  getBrowserConfig(): BrowserConfig;
  setBrowserConfig(a: BrowserConfig): void;
  getPolitenessConfig(): PolitenessConfig;
  setPolitenessConfig(a: PolitenessConfig): void;
  getBrowserScript(): BrowserScript;
  setBrowserScript(a: BrowserScript): void;
  getCrawlHostGroupConfig(): CrawlHostGroupConfig;
  setCrawlHostGroupConfig(a: CrawlHostGroupConfig): void;
  getRoleMapping(): RoleMapping;
  setRoleMapping(a: RoleMapping): void;
  getCollection(): Collection;
  setCollection(a: Collection): void;
  toObject(): ConfigObject.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ConfigObject;
}

export namespace ConfigObject {
  export type AsObject = {
    id: string;
    apiversion: string;
    kind: Kind;
    meta: Meta;
    crawlEntity: CrawlEntity;
    seed: Seed;
    crawlJob: CrawlJob;
    crawlConfig: CrawlConfig;
    crawlScheduleConfig: CrawlScheduleConfig;
    browserConfig: BrowserConfig;
    politenessConfig: PolitenessConfig;
    browserScript: BrowserScript;
    crawlHostGroupConfig: CrawlHostGroupConfig;
    roleMapping: RoleMapping;
    collection: Collection;
  }
}

export class ConfigRef {
  constructor ();
  getKind(): Kind;
  setKind(a: Kind): void;
  getId(): string;
  setId(a: string): void;
  toObject(): ConfigRef.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ConfigRef;
}

export namespace ConfigRef {
  export type AsObject = {
    kind: Kind;
    id: string;
  }
}

export class CrawlConfig {
  constructor ();
  getCollectionRef(): ConfigRef;
  setCollectionRef(a: ConfigRef): void;
  getBrowserConfigRef(): ConfigRef;
  setBrowserConfigRef(a: ConfigRef): void;
  getPolitenessRef(): ConfigRef;
  setPolitenessRef(a: ConfigRef): void;
  getExtra(): ExtraConfig;
  setExtra(a: ExtraConfig): void;
  getMinimumDnsTtlS(): number;
  setMinimumDnsTtlS(a: number): void;
  getPriorityWeight(): number;
  setPriorityWeight(a: number): void;
  toObject(): CrawlConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlConfig;
}

export namespace CrawlConfig {
  export type AsObject = {
    collectionRef: ConfigRef;
    browserConfigRef: ConfigRef;
    politenessRef: ConfigRef;
    extra: ExtraConfig;
    minimumDnsTtlS: number;
    priorityWeight: number;
  }
}

export class CrawlEntity {
  constructor ();
  toObject(): CrawlEntity.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlEntity;
}

export namespace CrawlEntity {
  export type AsObject = {
  }
}

export class CrawlHostGroupConfig {
  constructor ();
  getIpRangeList(): CrawlHostGroupConfig.IpRange[];
  setIpRangeList(a: CrawlHostGroupConfig.IpRange[]): void;
  toObject(): CrawlHostGroupConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlHostGroupConfig;
}

export namespace CrawlHostGroupConfig {
  export type AsObject = {
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

export class CrawlJob {
  constructor ();
  getScheduleRef(): ConfigRef;
  setScheduleRef(a: ConfigRef): void;
  getLimits(): CrawlLimitsConfig;
  setLimits(a: CrawlLimitsConfig): void;
  getCrawlConfigRef(): ConfigRef;
  setCrawlConfigRef(a: ConfigRef): void;
  getDisabled(): boolean;
  setDisabled(a: boolean): void;
  toObject(): CrawlJob.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => CrawlJob;
}

export namespace CrawlJob {
  export type AsObject = {
    scheduleRef: ConfigRef;
    limits: CrawlLimitsConfig;
    crawlConfigRef: ConfigRef;
    disabled: boolean;
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
    cronExpression: string;
    validFrom: Timestamp;
    validTo: Timestamp;
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

export class DeleteResponse {
  constructor ();
  getDeleted(): boolean;
  setDeleted(a: boolean): void;
  toObject(): DeleteResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => DeleteResponse;
}

export namespace DeleteResponse {
  export type AsObject = {
    deleted: boolean;
  }
}

export class ExtraConfig {
  constructor ();
  getExtractText(): boolean;
  setExtractText(a: boolean): void;
  getCreateScreenshot(): boolean;
  setCreateScreenshot(a: boolean): void;
  toObject(): ExtraConfig.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ExtraConfig;
}

export namespace ExtraConfig {
  export type AsObject = {
    extractText: boolean;
    createScreenshot: boolean;
  }
}

export class FieldMask {
  constructor ();
  getPathsList(): string[];
  setPathsList(a: string[]): void;
  toObject(): FieldMask.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => FieldMask;
}

export namespace FieldMask {
  export type AsObject = {
    pathsList: string[];
  }
}

export class GetLabelKeysRequest {
  constructor ();
  getKind(): Kind;
  setKind(a: Kind): void;
  toObject(): GetLabelKeysRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => GetLabelKeysRequest;
}

export namespace GetLabelKeysRequest {
  export type AsObject = {
    kind: Kind;
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

export class LabelKeysResponse {
  constructor ();
  getKeyList(): string[];
  setKeyList(a: string[]): void;
  toObject(): LabelKeysResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => LabelKeysResponse;
}

export namespace LabelKeysResponse {
  export type AsObject = {
    keyList: string[];
  }
}

export class ListCountResponse {
  constructor ();
  getCount(): number;
  setCount(a: number): void;
  getApproximate(): boolean;
  setApproximate(a: boolean): void;
  toObject(): ListCountResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ListCountResponse;
}

export namespace ListCountResponse {
  export type AsObject = {
    count: number;
    approximate: boolean;
  }
}

export class ListRequest {
  constructor ();
  getKind(): Kind;
  setKind(a: Kind): void;
  getIdList(): string[];
  setIdList(a: string[]): void;
  getNameRegex(): string;
  setNameRegex(a: string): void;
  getLabelSelectorList(): string[];
  setLabelSelectorList(a: string[]): void;
  getQueryTemplate(): ConfigObject;
  setQueryTemplate(a: ConfigObject): void;
  getQueryMask(): FieldMask;
  setQueryMask(a: FieldMask): void;
  getReturnedFieldsMask(): FieldMask;
  setReturnedFieldsMask(a: FieldMask): void;
  getOrderByPath(): string;
  setOrderByPath(a: string): void;
  getOrderDescending(): boolean;
  setOrderDescending(a: boolean): void;
  getPageSize(): number;
  setPageSize(a: number): void;
  getOffset(): number;
  setOffset(a: number): void;
  toObject(): ListRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => ListRequest;
}

export namespace ListRequest {
  export type AsObject = {
    kind: Kind;
    idList: string[];
    nameRegex: string;
    labelSelectorList: string[];
    queryTemplate: ConfigObject;
    queryMask: FieldMask;
    returnedFieldsMask: FieldMask;
    orderByPath: string;
    orderDescending: boolean;
    pageSize: number;
    offset: number;
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

export class PolitenessConfig {
  constructor ();
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

export class RoleMapping {
  constructor ();
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
    email: string;
    group: string;
    roleList: Role[];
  }
}

export class Seed {
  constructor ();
  getEntityRef(): ConfigRef;
  setEntityRef(a: ConfigRef): void;
  getScope(): CrawlScope;
  setScope(a: CrawlScope): void;
  getJobRefList(): ConfigRef[];
  setJobRefList(a: ConfigRef[]): void;
  getDisabled(): boolean;
  setDisabled(a: boolean): void;
  toObject(): Seed.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => Seed;
}

export namespace Seed {
  export type AsObject = {
    entityRef: ConfigRef;
    scope: CrawlScope;
    jobRefList: ConfigRef[];
    disabled: boolean;
  }
}

export class UpdateRequest {
  constructor ();
  getListRequest(): ListRequest;
  setListRequest(a: ListRequest): void;
  getUpdateMask(): FieldMask;
  setUpdateMask(a: FieldMask): void;
  getUpdateTemplate(): ConfigObject;
  setUpdateTemplate(a: ConfigObject): void;
  toObject(): UpdateRequest.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => UpdateRequest;
}

export namespace UpdateRequest {
  export type AsObject = {
    listRequest: ListRequest;
    updateMask: FieldMask;
    updateTemplate: ConfigObject;
  }
}

export class UpdateResponse {
  constructor ();
  getUpdated(): number;
  setUpdated(a: number): void;
  toObject(): UpdateResponse.AsObject;
  serializeBinary(): Uint8Array;
  static deserializeBinary: (bytes: {}) => UpdateResponse;
}

export namespace UpdateResponse {
  export type AsObject = {
    updated: number;
  }
}

export enum Kind {
  undefined = 0,
  crawlEntity = 5,
  seed = 6,
  crawlJob = 7,
  crawlConfig = 8,
  crawlScheduleConfig = 9,
  browserConfig = 10,
  politenessConfig = 11,
  browserScript = 12,
  crawlHostGroupConfig = 13,
  roleMapping = 14,
  collection = 15,
}
export enum Role {
  ANY_USER = 0,
  ANY = 1,
  ADMIN = 2,
  CURATOR = 3,
  READONLY = 4,
}
