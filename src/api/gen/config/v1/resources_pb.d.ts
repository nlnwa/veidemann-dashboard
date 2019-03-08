import * as jspb from "google-protobuf"

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class ConfigObject extends jspb.Message {
  constructor ();
  getId(): string;
  setId(value: string): void;
  getApiversion(): string;
  setApiversion(value: string): void;
  getKind(): Kind;
  setKind(value: Kind): void;
  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  clearMeta(): void;
  getCrawlEntity(): CrawlEntity | undefined;
  setCrawlEntity(value?: CrawlEntity): void;
  clearCrawlEntity(): void;
  getSeed(): Seed | undefined;
  setSeed(value?: Seed): void;
  clearSeed(): void;
  getCrawlJob(): CrawlJob | undefined;
  setCrawlJob(value?: CrawlJob): void;
  clearCrawlJob(): void;
  getCrawlConfig(): CrawlConfig | undefined;
  setCrawlConfig(value?: CrawlConfig): void;
  clearCrawlConfig(): void;
  getCrawlScheduleConfig(): CrawlScheduleConfig | undefined;
  setCrawlScheduleConfig(value?: CrawlScheduleConfig): void;
  clearCrawlScheduleConfig(): void;
  getBrowserConfig(): BrowserConfig | undefined;
  setBrowserConfig(value?: BrowserConfig): void;
  clearBrowserConfig(): void;
  getPolitenessConfig(): PolitenessConfig | undefined;
  setPolitenessConfig(value?: PolitenessConfig): void;
  clearPolitenessConfig(): void;
  getBrowserScript(): BrowserScript | undefined;
  setBrowserScript(value?: BrowserScript): void;
  clearBrowserScript(): void;
  getCrawlHostGroupConfig(): CrawlHostGroupConfig | undefined;
  setCrawlHostGroupConfig(value?: CrawlHostGroupConfig): void;
  clearCrawlHostGroupConfig(): void;
  getRoleMapping(): RoleMapping | undefined;
  setRoleMapping(value?: RoleMapping): void;
  clearRoleMapping(): void;
  getCollection(): Collection | undefined;
  setCollection(value?: Collection): void;
  clearCollection(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfigObject.AsObject;
  static toObject(includeInstance: boolean, msg: ConfigObject): ConfigObject.AsObject;
  static serializeBinaryToWriter(message: ConfigObject, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfigObject;
  static deserializeBinaryFromReader(message: ConfigObject, reader: jspb.BinaryReader): ConfigObject;
}

export namespace ConfigObject {
  export type AsObject = {
    id: string;
    apiversion: string;
    kind: Kind;
    meta?: Meta.AsObject;
    crawlEntity?: CrawlEntity.AsObject;
    seed?: Seed.AsObject;
    crawlJob?: CrawlJob.AsObject;
    crawlConfig?: CrawlConfig.AsObject;
    crawlScheduleConfig?: CrawlScheduleConfig.AsObject;
    browserConfig?: BrowserConfig.AsObject;
    politenessConfig?: PolitenessConfig.AsObject;
    browserScript?: BrowserScript.AsObject;
    crawlHostGroupConfig?: CrawlHostGroupConfig.AsObject;
    roleMapping?: RoleMapping.AsObject;
    collection?: Collection.AsObject;
  }
}

export class Meta extends jspb.Message {
  constructor ();
  getName(): string;
  setName(value: string): void;
  getDescription(): string;
  setDescription(value: string): void;
  getCreated(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreated(value?: google_protobuf_timestamp_pb.Timestamp): void;
  clearCreated(): void;
  getCreatedBy(): string;
  setCreatedBy(value: string): void;
  getLastModified(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setLastModified(value?: google_protobuf_timestamp_pb.Timestamp): void;
  clearLastModified(): void;
  getLastModifiedBy(): string;
  setLastModifiedBy(value: string): void;
  getLabelList(): Label[] | undefined;
  setLabelList(value?: Label[]): void;
  clearLabelList(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Meta.AsObject;
  static toObject(includeInstance: boolean, msg: Meta): Meta.AsObject;
  static serializeBinaryToWriter(message: Meta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Meta;
  static deserializeBinaryFromReader(message: Meta, reader: jspb.BinaryReader): Meta;
}

export namespace Meta {
  export type AsObject = {
    name: string;
    description: string;
    created?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    createdBy: string;
    lastModified?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    lastModifiedBy: string;
    labelList?: Label.AsObject[];
  }
}

export class Label extends jspb.Message {
  constructor ();
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
    key: string;
    value: string;
  }
}

export class ConfigRef extends jspb.Message {
  constructor ();
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
    kind: Kind;
    id: string;
  }
}

export class CrawlEntity extends jspb.Message {
  constructor ();
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
  constructor ();
  getEntityRef(): ConfigRef | undefined;
  setEntityRef(value?: ConfigRef): void;
  clearEntityRef(): void;
  getScope(): CrawlScope | undefined;
  setScope(value?: CrawlScope): void;
  clearScope(): void;
  getJobRefList(): ConfigRef[] | undefined;
  setJobRefList(value?: ConfigRef[]): void;
  clearJobRefList(): void;
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
    entityRef?: ConfigRef.AsObject;
    scope?: CrawlScope.AsObject;
    jobRefList?: ConfigRef.AsObject[];
    disabled: boolean;
  }
}

export class CrawlJob extends jspb.Message {
  constructor ();
  getScheduleRef(): ConfigRef | undefined;
  setScheduleRef(value?: ConfigRef): void;
  clearScheduleRef(): void;
  getLimits(): CrawlLimitsConfig | undefined;
  setLimits(value?: CrawlLimitsConfig): void;
  clearLimits(): void;
  getCrawlConfigRef(): ConfigRef | undefined;
  setCrawlConfigRef(value?: ConfigRef): void;
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
    scheduleRef?: ConfigRef.AsObject;
    limits?: CrawlLimitsConfig.AsObject;
    crawlConfigRef?: ConfigRef.AsObject;
    disabled: boolean;
  }
}

export class CrawlConfig extends jspb.Message {
  constructor ();
  getCollectionRef(): ConfigRef | undefined;
  setCollectionRef(value?: ConfigRef): void;
  clearCollectionRef(): void;
  getBrowserConfigRef(): ConfigRef | undefined;
  setBrowserConfigRef(value?: ConfigRef): void;
  clearBrowserConfigRef(): void;
  getPolitenessRef(): ConfigRef | undefined;
  setPolitenessRef(value?: ConfigRef): void;
  clearPolitenessRef(): void;
  getExtra(): ExtraConfig | undefined;
  setExtra(value?: ExtraConfig): void;
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
    collectionRef?: ConfigRef.AsObject;
    browserConfigRef?: ConfigRef.AsObject;
    politenessRef?: ConfigRef.AsObject;
    extra?: ExtraConfig.AsObject;
    minimumDnsTtlS: number;
    priorityWeight: number;
  }
}

export class ExtraConfig extends jspb.Message {
  constructor ();
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
    extractText: boolean;
    createScreenshot: boolean;
  }
}

export class CrawlScheduleConfig extends jspb.Message {
  constructor ();
  getCronExpression(): string;
  setCronExpression(value: string): void;
  getValidFrom(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setValidFrom(value?: google_protobuf_timestamp_pb.Timestamp): void;
  clearValidFrom(): void;
  getValidTo(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setValidTo(value?: google_protobuf_timestamp_pb.Timestamp): void;
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
    cronExpression: string;
    validFrom?: google_protobuf_timestamp_pb.Timestamp.AsObject;
    validTo?: google_protobuf_timestamp_pb.Timestamp.AsObject;
  }
}

export class CrawlScope extends jspb.Message {
  constructor ();
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
    surtPrefix: string;
  }
}

export class CrawlLimitsConfig extends jspb.Message {
  constructor ();
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
    depth: number;
    maxDurationS: number;
    maxBytes: number;
  }
}

export class BrowserConfig extends jspb.Message {
  constructor ();
  getUserAgent(): string;
  setUserAgent(value: string): void;
  getWindowWidth(): number;
  setWindowWidth(value: number): void;
  getWindowHeight(): number;
  setWindowHeight(value: number): void;
  getPageLoadTimeoutMs(): number;
  setPageLoadTimeoutMs(value: number): void;
  getScriptSelectorList(): string[];
  setScriptSelectorList(value: string[]): void;
  clearScriptSelectorList(): void;
  getScriptRefList(): ConfigRef[] | undefined;
  setScriptRefList(value?: ConfigRef[]): void;
  clearScriptRefList(): void;
  getHeadersMap(): jspb.Map<string, string> | undefined;
  clearHeadersMap(): void;
  getScriptParametersMap(): jspb.Map<string, string> | undefined;
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
    userAgent: string;
    windowWidth: number;
    windowHeight: number;
    pageLoadTimeoutMs: number;
    scriptSelectorList: string[];
    scriptRefList?: ConfigRef.AsObject[];
    headersMap?: BrowserConfig.HeadersEntry.AsObject[];
    scriptParametersMap?: BrowserConfig.ScriptParametersEntry.AsObject[];
    maxInactivityTimeMs: number;
  }

  export class HeadersEntry extends jspb.Message {
    constructor ();
    getKey(): string;
    setKey(value: string): void;
    getValue(): string;
    setValue(value: string): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HeadersEntry.AsObject;
    static toObject(includeInstance: boolean, msg: HeadersEntry): HeadersEntry.AsObject;
    static serializeBinaryToWriter(message: HeadersEntry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HeadersEntry;
    static deserializeBinaryFromReader(message: HeadersEntry, reader: jspb.BinaryReader): HeadersEntry;
  }

  export namespace HeadersEntry {
    export type AsObject = {
      key: string;
      value: string;
    }
  }


  export class ScriptParametersEntry extends jspb.Message {
    constructor ();
    getKey(): string;
    setKey(value: string): void;
    getValue(): string;
    setValue(value: string): void;
    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScriptParametersEntry.AsObject;
    static toObject(includeInstance: boolean, msg: ScriptParametersEntry): ScriptParametersEntry.AsObject;
    static serializeBinaryToWriter(message: ScriptParametersEntry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScriptParametersEntry;
    static deserializeBinaryFromReader(message: ScriptParametersEntry, reader: jspb.BinaryReader): ScriptParametersEntry;
  }

  export namespace ScriptParametersEntry {
    export type AsObject = {
      key: string;
      value: string;
    }
  }

}

export class PolitenessConfig extends jspb.Message {
  constructor ();
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
  getCrawlHostGroupSelectorList(): string[];
  setCrawlHostGroupSelectorList(value: string[]): void;
  clearCrawlHostGroupSelectorList(): void;
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

export class BrowserScript extends jspb.Message {
  constructor ();
  getScript(): string;
  setScript(value: string): void;
  getUrlRegexp(): string;
  setUrlRegexp(value: string): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BrowserScript.AsObject;
  static toObject(includeInstance: boolean, msg: BrowserScript): BrowserScript.AsObject;
  static serializeBinaryToWriter(message: BrowserScript, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BrowserScript;
  static deserializeBinaryFromReader(message: BrowserScript, reader: jspb.BinaryReader): BrowserScript;
}

export namespace BrowserScript {
  export type AsObject = {
    script: string;
    urlRegexp: string;
  }
}

export class CrawlHostGroupConfig extends jspb.Message {
  constructor ();
  getIpRangeList(): CrawlHostGroupConfig.IpRange[] | undefined;
  setIpRangeList(value?: CrawlHostGroupConfig.IpRange[]): void;
  clearIpRangeList(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlHostGroupConfig.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlHostGroupConfig): CrawlHostGroupConfig.AsObject;
  static serializeBinaryToWriter(message: CrawlHostGroupConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlHostGroupConfig;
  static deserializeBinaryFromReader(message: CrawlHostGroupConfig, reader: jspb.BinaryReader): CrawlHostGroupConfig;
}

export namespace CrawlHostGroupConfig {
  export type AsObject = {
    ipRangeList?: CrawlHostGroupConfig.IpRange.AsObject[];
  }

  export class IpRange extends jspb.Message {
    constructor ();
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
      ipFrom: string;
      ipTo: string;
    }
  }

}

export class RoleMapping extends jspb.Message {
  constructor ();
  getEmail(): string;
  setEmail(value: string): void;
  getGroup(): string;
  setGroup(value: string): void;
  getRoleList(): Role[];
  setRoleList(value: Role[]): void;
  clearRoleList(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoleMapping.AsObject;
  static toObject(includeInstance: boolean, msg: RoleMapping): RoleMapping.AsObject;
  static serializeBinaryToWriter(message: RoleMapping, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoleMapping;
  static deserializeBinaryFromReader(message: RoleMapping, reader: jspb.BinaryReader): RoleMapping;
}

export namespace RoleMapping {
  export type AsObject = {
    email: string;
    group: string;
    roleList: Role[];
  }
}

export class Collection extends jspb.Message {
  constructor ();
  getCollectionDedupPolicy(): Collection.RotationPolicy;
  setCollectionDedupPolicy(value: Collection.RotationPolicy): void;
  getFileRotationPolicy(): Collection.RotationPolicy;
  setFileRotationPolicy(value: Collection.RotationPolicy): void;
  getCompress(): boolean;
  setCompress(value: boolean): void;
  getFileSize(): number;
  setFileSize(value: number): void;
  getSubCollectionsList(): Collection.SubCollection[] | undefined;
  setSubCollectionsList(value?: Collection.SubCollection[]): void;
  clearSubCollectionsList(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Collection.AsObject;
  static toObject(includeInstance: boolean, msg: Collection): Collection.AsObject;
  static serializeBinaryToWriter(message: Collection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Collection;
  static deserializeBinaryFromReader(message: Collection, reader: jspb.BinaryReader): Collection;
}

export namespace Collection {
  export type AsObject = {
    collectionDedupPolicy: Collection.RotationPolicy;
    fileRotationPolicy: Collection.RotationPolicy;
    compress: boolean;
    fileSize: number;
    subCollectionsList?: Collection.SubCollection.AsObject[];
  }

  export class SubCollection extends jspb.Message {
    constructor ();
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
      type: Collection.SubCollectionType;
      name: string;
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
}
