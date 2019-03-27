import * as jspb from "google-protobuf"

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class ConfigObject extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getApiversion(): string;
  setApiversion(value: string): void;

  getKind(): Kind;
  setKind(value: Kind): void;

  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  hasMeta(): boolean;
  clearMeta(): void;

  getCrawlEntity(): CrawlEntity | undefined;
  setCrawlEntity(value?: CrawlEntity): void;
  hasCrawlEntity(): boolean;
  clearCrawlEntity(): void;
  hasCrawlEntity(): boolean;

  getSeed(): Seed | undefined;
  setSeed(value?: Seed): void;
  hasSeed(): boolean;
  clearSeed(): void;
  hasSeed(): boolean;

  getCrawlJob(): CrawlJob | undefined;
  setCrawlJob(value?: CrawlJob): void;
  hasCrawlJob(): boolean;
  clearCrawlJob(): void;
  hasCrawlJob(): boolean;

  getCrawlConfig(): CrawlConfig | undefined;
  setCrawlConfig(value?: CrawlConfig): void;
  hasCrawlConfig(): boolean;
  clearCrawlConfig(): void;
  hasCrawlConfig(): boolean;

  getCrawlScheduleConfig(): CrawlScheduleConfig | undefined;
  setCrawlScheduleConfig(value?: CrawlScheduleConfig): void;
  hasCrawlScheduleConfig(): boolean;
  clearCrawlScheduleConfig(): void;
  hasCrawlScheduleConfig(): boolean;

  getBrowserConfig(): BrowserConfig | undefined;
  setBrowserConfig(value?: BrowserConfig): void;
  hasBrowserConfig(): boolean;
  clearBrowserConfig(): void;
  hasBrowserConfig(): boolean;

  getPolitenessConfig(): PolitenessConfig | undefined;
  setPolitenessConfig(value?: PolitenessConfig): void;
  hasPolitenessConfig(): boolean;
  clearPolitenessConfig(): void;
  hasPolitenessConfig(): boolean;

  getBrowserScript(): BrowserScript | undefined;
  setBrowserScript(value?: BrowserScript): void;
  hasBrowserScript(): boolean;
  clearBrowserScript(): void;
  hasBrowserScript(): boolean;

  getCrawlHostGroupConfig(): CrawlHostGroupConfig | undefined;
  setCrawlHostGroupConfig(value?: CrawlHostGroupConfig): void;
  hasCrawlHostGroupConfig(): boolean;
  clearCrawlHostGroupConfig(): void;
  hasCrawlHostGroupConfig(): boolean;

  getRoleMapping(): RoleMapping | undefined;
  setRoleMapping(value?: RoleMapping): void;
  hasRoleMapping(): boolean;
  clearRoleMapping(): void;
  hasRoleMapping(): boolean;

  getCollection(): Collection | undefined;
  setCollection(value?: Collection): void;
  hasCollection(): boolean;
  clearCollection(): void;
  hasCollection(): boolean;

  getSpecCase(): ConfigObject.SpecCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfigObject.AsObject;
  static toObject(includeInstance: boolean, msg: ConfigObject): ConfigObject.AsObject;
  static serializeBinaryToWriter(message: ConfigObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfigObject;
  static deserializeBinaryFromReader(message: ConfigObject, reader: jspb.BinaryReader): ConfigObject;
}

export namespace ConfigObject {
  export type AsObject = {
    id: string,
    apiversion: string,
    kind: Kind,
    meta?: Meta.AsObject,
    crawlEntity?: CrawlEntity.AsObject,
    seed?: Seed.AsObject,
    crawlJob?: CrawlJob.AsObject,
    crawlConfig?: CrawlConfig.AsObject,
    crawlScheduleConfig?: CrawlScheduleConfig.AsObject,
    browserConfig?: BrowserConfig.AsObject,
    politenessConfig?: PolitenessConfig.AsObject,
    browserScript?: BrowserScript.AsObject,
    crawlHostGroupConfig?: CrawlHostGroupConfig.AsObject,
    roleMapping?: RoleMapping.AsObject,
    collection?: Collection.AsObject,
  }

  export enum SpecCase { 
    SPEC_NOT_SET = 0,
    CRAWL_ENTITY = 5,
    SEED = 6,
    CRAWL_JOB = 7,
    CRAWL_CONFIG = 8,
    CRAWL_SCHEDULE_CONFIG = 9,
    BROWSER_CONFIG = 10,
    POLITENESS_CONFIG = 11,
    BROWSER_SCRIPT = 12,
    CRAWL_HOST_GROUP_CONFIG = 13,
    ROLE_MAPPING = 14,
    COLLECTION = 15,
  }
}

export class Meta extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getCreated(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreated(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasCreated(): boolean;
  clearCreated(): void;

  getCreatedBy(): string;
  setCreatedBy(value: string): void;

  getLastModified(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setLastModified(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasLastModified(): boolean;
  clearLastModified(): void;

  getLastModifiedBy(): string;
  setLastModifiedBy(value: string): void;

  getLabelList(): Array<Label>;
  setLabelList(value: Array<Label>): void;
  clearLabelList(): void;
  addLabel(value?: Label, index?: number): Label;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Meta.AsObject;
  static toObject(includeInstance: boolean, msg: Meta): Meta.AsObject;
  static serializeBinaryToWriter(message: Meta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Meta;
  static deserializeBinaryFromReader(message: Meta, reader: jspb.BinaryReader): Meta;
}

export namespace Meta {
  export type AsObject = {
    name: string,
    description: string,
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    createdBy: string,
    lastModified?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    lastModifiedBy: string,
    labelList: Array<Label.AsObject>,
  }
}

export class Label extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Label.AsObject;
  static toObject(includeInstance: boolean, msg: Label): Label.AsObject;
  static serializeBinaryToWriter(message: Label, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Label;
  static deserializeBinaryFromReader(message: Label, reader: jspb.BinaryReader): Label;
}

export namespace Label {
  export type AsObject = {
    key: string,
    value: string,
  }
}

export class ConfigRef extends jspb.Message {
  getKind(): Kind;
  setKind(value: Kind): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfigRef.AsObject;
  static toObject(includeInstance: boolean, msg: ConfigRef): ConfigRef.AsObject;
  static serializeBinaryToWriter(message: ConfigRef, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfigRef;
  static deserializeBinaryFromReader(message: ConfigRef, reader: jspb.BinaryReader): ConfigRef;
}

export namespace ConfigRef {
  export type AsObject = {
    kind: Kind,
    id: string,
  }
}

export class CrawlEntity extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlEntity.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlEntity): CrawlEntity.AsObject;
  static serializeBinaryToWriter(message: CrawlEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlEntity;
  static deserializeBinaryFromReader(message: CrawlEntity, reader: jspb.BinaryReader): CrawlEntity;
}

export namespace CrawlEntity {
  export type AsObject = {
  }
}

export class Seed extends jspb.Message {
  getEntityRef(): ConfigRef | undefined;
  setEntityRef(value?: ConfigRef): void;
  hasEntityRef(): boolean;
  clearEntityRef(): void;

  getScope(): CrawlScope | undefined;
  setScope(value?: CrawlScope): void;
  hasScope(): boolean;
  clearScope(): void;

  getJobRefList(): Array<ConfigRef>;
  setJobRefList(value: Array<ConfigRef>): void;
  clearJobRefList(): void;
  addJobRef(value?: ConfigRef, index?: number): ConfigRef;

  getDisabled(): boolean;
  setDisabled(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Seed.AsObject;
  static toObject(includeInstance: boolean, msg: Seed): Seed.AsObject;
  static serializeBinaryToWriter(message: Seed, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Seed;
  static deserializeBinaryFromReader(message: Seed, reader: jspb.BinaryReader): Seed;
}

export namespace Seed {
  export type AsObject = {
    entityRef?: ConfigRef.AsObject,
    scope?: CrawlScope.AsObject,
    jobRefList: Array<ConfigRef.AsObject>,
    disabled: boolean,
  }
}

export class CrawlJob extends jspb.Message {
  getScheduleRef(): ConfigRef | undefined;
  setScheduleRef(value?: ConfigRef): void;
  hasScheduleRef(): boolean;
  clearScheduleRef(): void;

  getLimits(): CrawlLimitsConfig | undefined;
  setLimits(value?: CrawlLimitsConfig): void;
  hasLimits(): boolean;
  clearLimits(): void;

  getCrawlConfigRef(): ConfigRef | undefined;
  setCrawlConfigRef(value?: ConfigRef): void;
  hasCrawlConfigRef(): boolean;
  clearCrawlConfigRef(): void;

  getDisabled(): boolean;
  setDisabled(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlJob.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlJob): CrawlJob.AsObject;
  static serializeBinaryToWriter(message: CrawlJob, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlJob;
  static deserializeBinaryFromReader(message: CrawlJob, reader: jspb.BinaryReader): CrawlJob;
}

export namespace CrawlJob {
  export type AsObject = {
    scheduleRef?: ConfigRef.AsObject,
    limits?: CrawlLimitsConfig.AsObject,
    crawlConfigRef?: ConfigRef.AsObject,
    disabled: boolean,
  }
}

export class CrawlConfig extends jspb.Message {
  getCollectionRef(): ConfigRef | undefined;
  setCollectionRef(value?: ConfigRef): void;
  hasCollectionRef(): boolean;
  clearCollectionRef(): void;

  getBrowserConfigRef(): ConfigRef | undefined;
  setBrowserConfigRef(value?: ConfigRef): void;
  hasBrowserConfigRef(): boolean;
  clearBrowserConfigRef(): void;

  getPolitenessRef(): ConfigRef | undefined;
  setPolitenessRef(value?: ConfigRef): void;
  hasPolitenessRef(): boolean;
  clearPolitenessRef(): void;

  getExtra(): ExtraConfig | undefined;
  setExtra(value?: ExtraConfig): void;
  hasExtra(): boolean;
  clearExtra(): void;

  getMinimumDnsTtlS(): number;
  setMinimumDnsTtlS(value: number): void;

  getPriorityWeight(): number;
  setPriorityWeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlConfig.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlConfig): CrawlConfig.AsObject;
  static serializeBinaryToWriter(message: CrawlConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlConfig;
  static deserializeBinaryFromReader(message: CrawlConfig, reader: jspb.BinaryReader): CrawlConfig;
}

export namespace CrawlConfig {
  export type AsObject = {
    collectionRef?: ConfigRef.AsObject,
    browserConfigRef?: ConfigRef.AsObject,
    politenessRef?: ConfigRef.AsObject,
    extra?: ExtraConfig.AsObject,
    minimumDnsTtlS: number,
    priorityWeight: number,
  }
}

export class ExtraConfig extends jspb.Message {
  getExtractText(): boolean;
  setExtractText(value: boolean): void;

  getCreateScreenshot(): boolean;
  setCreateScreenshot(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtraConfig.AsObject;
  static toObject(includeInstance: boolean, msg: ExtraConfig): ExtraConfig.AsObject;
  static serializeBinaryToWriter(message: ExtraConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtraConfig;
  static deserializeBinaryFromReader(message: ExtraConfig, reader: jspb.BinaryReader): ExtraConfig;
}

export namespace ExtraConfig {
  export type AsObject = {
    extractText: boolean,
    createScreenshot: boolean,
  }
}

export class CrawlScheduleConfig extends jspb.Message {
  getCronExpression(): string;
  setCronExpression(value: string): void;

  getValidFrom(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setValidFrom(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasValidFrom(): boolean;
  clearValidFrom(): void;

  getValidTo(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setValidTo(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasValidTo(): boolean;
  clearValidTo(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlScheduleConfig.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlScheduleConfig): CrawlScheduleConfig.AsObject;
  static serializeBinaryToWriter(message: CrawlScheduleConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlScheduleConfig;
  static deserializeBinaryFromReader(message: CrawlScheduleConfig, reader: jspb.BinaryReader): CrawlScheduleConfig;
}

export namespace CrawlScheduleConfig {
  export type AsObject = {
    cronExpression: string,
    validFrom?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    validTo?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class CrawlScope extends jspb.Message {
  getSurtPrefix(): string;
  setSurtPrefix(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlScope.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlScope): CrawlScope.AsObject;
  static serializeBinaryToWriter(message: CrawlScope, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlScope;
  static deserializeBinaryFromReader(message: CrawlScope, reader: jspb.BinaryReader): CrawlScope;
}

export namespace CrawlScope {
  export type AsObject = {
    surtPrefix: string,
  }
}

export class CrawlLimitsConfig extends jspb.Message {
  getDepth(): number;
  setDepth(value: number): void;

  getMaxDurationS(): number;
  setMaxDurationS(value: number): void;

  getMaxBytes(): number;
  setMaxBytes(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlLimitsConfig.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlLimitsConfig): CrawlLimitsConfig.AsObject;
  static serializeBinaryToWriter(message: CrawlLimitsConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlLimitsConfig;
  static deserializeBinaryFromReader(message: CrawlLimitsConfig, reader: jspb.BinaryReader): CrawlLimitsConfig;
}

export namespace CrawlLimitsConfig {
  export type AsObject = {
    depth: number,
    maxDurationS: number,
    maxBytes: number,
  }
}

export class BrowserConfig extends jspb.Message {
  getUserAgent(): string;
  setUserAgent(value: string): void;

  getWindowWidth(): number;
  setWindowWidth(value: number): void;

  getWindowHeight(): number;
  setWindowHeight(value: number): void;

  getPageLoadTimeoutMs(): number;
  setPageLoadTimeoutMs(value: number): void;

  getScriptSelectorList(): Array<string>;
  setScriptSelectorList(value: Array<string>): void;
  clearScriptSelectorList(): void;
  addScriptSelector(value: string, index?: number): void;

  getScriptRefList(): Array<ConfigRef>;
  setScriptRefList(value: Array<ConfigRef>): void;
  clearScriptRefList(): void;
  addScriptRef(value?: ConfigRef, index?: number): ConfigRef;

  getHeadersMap(): jspb.Map<string, string>;
  clearHeadersMap(): void;

  getScriptParametersMap(): jspb.Map<string, string>;
  clearScriptParametersMap(): void;

  getMaxInactivityTimeMs(): number;
  setMaxInactivityTimeMs(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BrowserConfig.AsObject;
  static toObject(includeInstance: boolean, msg: BrowserConfig): BrowserConfig.AsObject;
  static serializeBinaryToWriter(message: BrowserConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BrowserConfig;
  static deserializeBinaryFromReader(message: BrowserConfig, reader: jspb.BinaryReader): BrowserConfig;
}

export namespace BrowserConfig {
  export type AsObject = {
    userAgent: string,
    windowWidth: number,
    windowHeight: number,
    pageLoadTimeoutMs: number,
    scriptSelectorList: Array<string>,
    scriptRefList: Array<ConfigRef.AsObject>,
    headersMap: Array<[string, string]>,
    scriptParametersMap: Array<[string, string]>,
    maxInactivityTimeMs: number,
  }
}

export class PolitenessConfig extends jspb.Message {
  getRobotsPolicy(): PolitenessConfig.RobotsPolicy;
  setRobotsPolicy(value: PolitenessConfig.RobotsPolicy): void;

  getMinimumRobotsValidityDurationS(): number;
  setMinimumRobotsValidityDurationS(value: number): void;

  getCustomRobots(): string;
  setCustomRobots(value: string): void;

  getMinTimeBetweenPageLoadMs(): number;
  setMinTimeBetweenPageLoadMs(value: number): void;

  getMaxTimeBetweenPageLoadMs(): number;
  setMaxTimeBetweenPageLoadMs(value: number): void;

  getDelayFactor(): number;
  setDelayFactor(value: number): void;

  getMaxRetries(): number;
  setMaxRetries(value: number): void;

  getRetryDelaySeconds(): number;
  setRetryDelaySeconds(value: number): void;

  getCrawlHostGroupSelectorList(): Array<string>;
  setCrawlHostGroupSelectorList(value: Array<string>): void;
  clearCrawlHostGroupSelectorList(): void;
  addCrawlHostGroupSelector(value: string, index?: number): void;

  getUseHostname(): boolean;
  setUseHostname(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PolitenessConfig.AsObject;
  static toObject(includeInstance: boolean, msg: PolitenessConfig): PolitenessConfig.AsObject;
  static serializeBinaryToWriter(message: PolitenessConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PolitenessConfig;
  static deserializeBinaryFromReader(message: PolitenessConfig, reader: jspb.BinaryReader): PolitenessConfig;
}

export namespace PolitenessConfig {
  export type AsObject = {
    robotsPolicy: PolitenessConfig.RobotsPolicy,
    minimumRobotsValidityDurationS: number,
    customRobots: string,
    minTimeBetweenPageLoadMs: number,
    maxTimeBetweenPageLoadMs: number,
    delayFactor: number,
    maxRetries: number,
    retryDelaySeconds: number,
    crawlHostGroupSelectorList: Array<string>,
    useHostname: boolean,
  }

  export enum RobotsPolicy { 
    OBEY_ROBOTS = 0,
    IGNORE_ROBOTS = 1,
    CUSTOM_ROBOTS = 2,
  }
}

export class BrowserScript extends jspb.Message {
  getScript(): string;
  setScript(value: string): void;

  getUrlRegexpList(): Array<string>;
  setUrlRegexpList(value: Array<string>): void;
  clearUrlRegexpList(): void;
  addUrlRegexp(value: string, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BrowserScript.AsObject;
  static toObject(includeInstance: boolean, msg: BrowserScript): BrowserScript.AsObject;
  static serializeBinaryToWriter(message: BrowserScript, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BrowserScript;
  static deserializeBinaryFromReader(message: BrowserScript, reader: jspb.BinaryReader): BrowserScript;
}

export namespace BrowserScript {
  export type AsObject = {
    script: string,
    urlRegexpList: Array<string>,
  }
}

export class CrawlHostGroupConfig extends jspb.Message {
  getIpRangeList(): Array<CrawlHostGroupConfig.IpRange>;
  setIpRangeList(value: Array<CrawlHostGroupConfig.IpRange>): void;
  clearIpRangeList(): void;
  addIpRange(value?: CrawlHostGroupConfig.IpRange, index?: number): CrawlHostGroupConfig.IpRange;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlHostGroupConfig.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlHostGroupConfig): CrawlHostGroupConfig.AsObject;
  static serializeBinaryToWriter(message: CrawlHostGroupConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlHostGroupConfig;
  static deserializeBinaryFromReader(message: CrawlHostGroupConfig, reader: jspb.BinaryReader): CrawlHostGroupConfig;
}

export namespace CrawlHostGroupConfig {
  export type AsObject = {
    ipRangeList: Array<CrawlHostGroupConfig.IpRange.AsObject>,
  }

  export class IpRange extends jspb.Message {
    getIpFrom(): string;
    setIpFrom(value: string): void;

    getIpTo(): string;
    setIpTo(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IpRange.AsObject;
    static toObject(includeInstance: boolean, msg: IpRange): IpRange.AsObject;
    static serializeBinaryToWriter(message: IpRange, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IpRange;
    static deserializeBinaryFromReader(message: IpRange, reader: jspb.BinaryReader): IpRange;
  }

  export namespace IpRange {
    export type AsObject = {
      ipFrom: string,
      ipTo: string,
    }
  }

}

export class RoleMapping extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;
  hasEmail(): boolean;

  getGroup(): string;
  setGroup(value: string): void;
  hasGroup(): boolean;

  getRoleList(): Array<Role>;
  setRoleList(value: Array<Role>): void;
  clearRoleList(): void;
  addRole(value: Role, index?: number): void;

  getEmailOrGroupCase(): RoleMapping.EmailOrGroupCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoleMapping.AsObject;
  static toObject(includeInstance: boolean, msg: RoleMapping): RoleMapping.AsObject;
  static serializeBinaryToWriter(message: RoleMapping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoleMapping;
  static deserializeBinaryFromReader(message: RoleMapping, reader: jspb.BinaryReader): RoleMapping;
}

export namespace RoleMapping {
  export type AsObject = {
    email: string,
    group: string,
    roleList: Array<Role>,
  }

  export enum EmailOrGroupCase { 
    EMAIL_OR_GROUP_NOT_SET = 0,
    EMAIL = 2,
    GROUP = 3,
  }
}

export class Collection extends jspb.Message {
  getCollectionDedupPolicy(): Collection.RotationPolicy;
  setCollectionDedupPolicy(value: Collection.RotationPolicy): void;

  getFileRotationPolicy(): Collection.RotationPolicy;
  setFileRotationPolicy(value: Collection.RotationPolicy): void;

  getCompress(): boolean;
  setCompress(value: boolean): void;

  getFileSize(): number;
  setFileSize(value: number): void;

  getSubCollectionsList(): Array<Collection.SubCollection>;
  setSubCollectionsList(value: Array<Collection.SubCollection>): void;
  clearSubCollectionsList(): void;
  addSubCollections(value?: Collection.SubCollection, index?: number): Collection.SubCollection;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Collection.AsObject;
  static toObject(includeInstance: boolean, msg: Collection): Collection.AsObject;
  static serializeBinaryToWriter(message: Collection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Collection;
  static deserializeBinaryFromReader(message: Collection, reader: jspb.BinaryReader): Collection;
}

export namespace Collection {
  export type AsObject = {
    collectionDedupPolicy: Collection.RotationPolicy,
    fileRotationPolicy: Collection.RotationPolicy,
    compress: boolean,
    fileSize: number,
    subCollectionsList: Array<Collection.SubCollection.AsObject>,
  }

  export class SubCollection extends jspb.Message {
    getType(): Collection.SubCollectionType;
    setType(value: Collection.SubCollectionType): void;

    getName(): string;
    setName(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubCollection.AsObject;
    static toObject(includeInstance: boolean, msg: SubCollection): SubCollection.AsObject;
    static serializeBinaryToWriter(message: SubCollection, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubCollection;
    static deserializeBinaryFromReader(message: SubCollection, reader: jspb.BinaryReader): SubCollection;
  }

  export namespace SubCollection {
    export type AsObject = {
      type: Collection.SubCollectionType,
      name: string,
    }
  }


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
  OPERATOR = 5,
  SYSTEM = 6,
}
