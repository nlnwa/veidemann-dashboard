import * as jspb from "google-protobuf"

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

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

export class CrawlEntity extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  hasMeta(): boolean;
  clearMeta(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlEntity.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlEntity): CrawlEntity.AsObject;
  static serializeBinaryToWriter(message: CrawlEntity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlEntity;
  static deserializeBinaryFromReader(message: CrawlEntity, reader: jspb.BinaryReader): CrawlEntity;
}

export namespace CrawlEntity {
  export type AsObject = {
    id: string,
    meta?: Meta.AsObject,
  }
}

export class Seed extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  hasMeta(): boolean;
  clearMeta(): void;

  getEntityId(): string;
  setEntityId(value: string): void;

  getScope(): CrawlScope | undefined;
  setScope(value?: CrawlScope): void;
  hasScope(): boolean;
  clearScope(): void;

  getJobIdList(): Array<string>;
  setJobIdList(value: Array<string>): void;
  clearJobIdList(): void;
  addJobId(value: string, index?: number): void;

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
    id: string,
    meta?: Meta.AsObject,
    entityId: string,
    scope?: CrawlScope.AsObject,
    jobIdList: Array<string>,
    disabled: boolean,
  }
}

export class CrawlJob extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  hasMeta(): boolean;
  clearMeta(): void;

  getScheduleId(): string;
  setScheduleId(value: string): void;

  getLimits(): CrawlLimitsConfig | undefined;
  setLimits(value?: CrawlLimitsConfig): void;
  hasLimits(): boolean;
  clearLimits(): void;

  getCrawlConfigId(): string;
  setCrawlConfigId(value: string): void;

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
    id: string,
    meta?: Meta.AsObject,
    scheduleId: string,
    limits?: CrawlLimitsConfig.AsObject,
    crawlConfigId: string,
    disabled: boolean,
  }
}

export class CrawlConfig extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  hasMeta(): boolean;
  clearMeta(): void;

  getBrowserConfigId(): string;
  setBrowserConfigId(value: string): void;

  getPolitenessId(): string;
  setPolitenessId(value: string): void;

  getExtra(): ExtraConfig | undefined;
  setExtra(value?: ExtraConfig): void;
  hasExtra(): boolean;
  clearExtra(): void;

  getMinimumDnsTtlS(): number;
  setMinimumDnsTtlS(value: number): void;

  getPriorityWeight(): number;
  setPriorityWeight(value: number): void;

  getDepthFirst(): boolean;
  setDepthFirst(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlConfig.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlConfig): CrawlConfig.AsObject;
  static serializeBinaryToWriter(message: CrawlConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlConfig;
  static deserializeBinaryFromReader(message: CrawlConfig, reader: jspb.BinaryReader): CrawlConfig;
}

export namespace CrawlConfig {
  export type AsObject = {
    id: string,
    meta?: Meta.AsObject,
    browserConfigId: string,
    politenessId: string,
    extra?: ExtraConfig.AsObject,
    minimumDnsTtlS: number,
    priorityWeight: number,
    depthFirst: boolean,
  }
}

export class CrawlScheduleConfig extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  hasMeta(): boolean;
  clearMeta(): void;

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
    id: string,
    meta?: Meta.AsObject,
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
  getId(): string;
  setId(value: string): void;

  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  hasMeta(): boolean;
  clearMeta(): void;

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

  getScriptIdList(): Array<string>;
  setScriptIdList(value: Array<string>): void;
  clearScriptIdList(): void;
  addScriptId(value: string, index?: number): void;

  getHeadersMap(): jspb.Map<string, string>;
  clearHeadersMap(): void;

  getScriptParametersMap(): jspb.Map<string, string>;
  clearScriptParametersMap(): void;

  getSleepAfterPageloadMs(): number;
  setSleepAfterPageloadMs(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BrowserConfig.AsObject;
  static toObject(includeInstance: boolean, msg: BrowserConfig): BrowserConfig.AsObject;
  static serializeBinaryToWriter(message: BrowserConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BrowserConfig;
  static deserializeBinaryFromReader(message: BrowserConfig, reader: jspb.BinaryReader): BrowserConfig;
}

export namespace BrowserConfig {
  export type AsObject = {
    id: string,
    meta?: Meta.AsObject,
    userAgent: string,
    windowWidth: number,
    windowHeight: number,
    pageLoadTimeoutMs: number,
    scriptSelectorList: Array<string>,
    scriptIdList: Array<string>,
    headersMap: Array<[string, string]>,
    scriptParametersMap: Array<[string, string]>,
    sleepAfterPageloadMs: number,
  }
}

export class PolitenessConfig extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  hasMeta(): boolean;
  clearMeta(): void;

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
    id: string,
    meta?: Meta.AsObject,
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

export class ExtraConfig extends jspb.Message {
  getExtractText(): boolean;
  setExtractText(value: boolean): void;

  getCreateSnapshot(): boolean;
  setCreateSnapshot(value: boolean): void;

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
    createSnapshot: boolean,
  }
}

export class BrowserScript extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  hasMeta(): boolean;
  clearMeta(): void;

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
    id: string,
    meta?: Meta.AsObject,
    script: string,
    urlRegexp: string,
  }
}

export class CrawlHostGroupConfig extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getMeta(): Meta | undefined;
  setMeta(value?: Meta): void;
  hasMeta(): boolean;
  clearMeta(): void;

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
    id: string,
    meta?: Meta.AsObject,
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

export class LogLevels extends jspb.Message {
  getLogLevelList(): Array<LogLevels.LogLevel>;
  setLogLevelList(value: Array<LogLevels.LogLevel>): void;
  clearLogLevelList(): void;
  addLogLevel(value?: LogLevels.LogLevel, index?: number): LogLevels.LogLevel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LogLevels.AsObject;
  static toObject(includeInstance: boolean, msg: LogLevels): LogLevels.AsObject;
  static serializeBinaryToWriter(message: LogLevels, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LogLevels;
  static deserializeBinaryFromReader(message: LogLevels, reader: jspb.BinaryReader): LogLevels;
}

export namespace LogLevels {
  export type AsObject = {
    logLevelList: Array<LogLevels.LogLevel.AsObject>,
  }

  export class LogLevel extends jspb.Message {
    getLogger(): string;
    setLogger(value: string): void;

    getLevel(): LogLevels.Level;
    setLevel(value: LogLevels.Level): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogLevel.AsObject;
    static toObject(includeInstance: boolean, msg: LogLevel): LogLevel.AsObject;
    static serializeBinaryToWriter(message: LogLevel, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogLevel;
    static deserializeBinaryFromReader(message: LogLevel, reader: jspb.BinaryReader): LogLevel;
  }

  export namespace LogLevel {
    export type AsObject = {
      logger: string,
      level: LogLevels.Level,
    }
  }


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

export class RoleMapping extends jspb.Message {
  getId(): string;
  setId(value: string): void;

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
    id: string,
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

export enum Role { 
  ANY_USER = 0,
  ANY = 1,
  ADMIN = 2,
  CURATOR = 3,
  READONLY = 4,
}
