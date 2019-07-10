import * as jspb from "google-protobuf"

import * as veidemann_api_config_pb from '../veidemann_api/config_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as google_api_annotations_pb from '../google/api/annotations_pb';
import * as protoc$gen$swagger_options_annotations_pb from '../protoc-gen-swagger/options/annotations_pb';

export class GetRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetRequest): GetRequest.AsObject;
  static serializeBinaryToWriter(message: GetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetRequest;
  static deserializeBinaryFromReader(message: GetRequest, reader: jspb.BinaryReader): GetRequest;
}

export namespace GetRequest {
  export type AsObject = {
    id: string,
  }
}

export class ListRequest extends jspb.Message {
  getIdList(): Array<string>;
  setIdList(value: Array<string>): void;
  clearIdList(): void;
  addId(value: string, index?: number): void;

  getName(): string;
  setName(value: string): void;

  getLabelSelectorList(): Array<string>;
  setLabelSelectorList(value: Array<string>): void;
  clearLabelSelectorList(): void;
  addLabelSelector(value: string, index?: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListRequest): ListRequest.AsObject;
  static serializeBinaryToWriter(message: ListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListRequest;
  static deserializeBinaryFromReader(message: ListRequest, reader: jspb.BinaryReader): ListRequest;
}

export namespace ListRequest {
  export type AsObject = {
    idList: Array<string>,
    name: string,
    labelSelectorList: Array<string>,
    pageSize: number,
    page: number,
  }
}

export class CrawlEntityListReply extends jspb.Message {
  getValueList(): Array<veidemann_api_config_pb.CrawlEntity>;
  setValueList(value: Array<veidemann_api_config_pb.CrawlEntity>): void;
  clearValueList(): void;
  addValue(value?: veidemann_api_config_pb.CrawlEntity, index?: number): veidemann_api_config_pb.CrawlEntity;

  getCount(): number;
  setCount(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlEntityListReply.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlEntityListReply): CrawlEntityListReply.AsObject;
  static serializeBinaryToWriter(message: CrawlEntityListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlEntityListReply;
  static deserializeBinaryFromReader(message: CrawlEntityListReply, reader: jspb.BinaryReader): CrawlEntityListReply;
}

export namespace CrawlEntityListReply {
  export type AsObject = {
    valueList: Array<veidemann_api_config_pb.CrawlEntity.AsObject>,
    count: number,
    pageSize: number,
    page: number,
  }
}

export class SeedListRequest extends jspb.Message {
  getIdList(): Array<string>;
  setIdList(value: Array<string>): void;
  clearIdList(): void;
  addId(value: string, index?: number): void;

  getName(): string;
  setName(value: string): void;

  getLabelSelectorList(): Array<string>;
  setLabelSelectorList(value: Array<string>): void;
  clearLabelSelectorList(): void;
  addLabelSelector(value: string, index?: number): void;

  getCrawlJobId(): string;
  setCrawlJobId(value: string): void;

  getEntityId(): string;
  setEntityId(value: string): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SeedListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SeedListRequest): SeedListRequest.AsObject;
  static serializeBinaryToWriter(message: SeedListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SeedListRequest;
  static deserializeBinaryFromReader(message: SeedListRequest, reader: jspb.BinaryReader): SeedListRequest;
}

export namespace SeedListRequest {
  export type AsObject = {
    idList: Array<string>,
    name: string,
    labelSelectorList: Array<string>,
    crawlJobId: string,
    entityId: string,
    pageSize: number,
    page: number,
  }
}

export class SeedListReply extends jspb.Message {
  getValueList(): Array<veidemann_api_config_pb.Seed>;
  setValueList(value: Array<veidemann_api_config_pb.Seed>): void;
  clearValueList(): void;
  addValue(value?: veidemann_api_config_pb.Seed, index?: number): veidemann_api_config_pb.Seed;

  getCount(): number;
  setCount(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SeedListReply.AsObject;
  static toObject(includeInstance: boolean, msg: SeedListReply): SeedListReply.AsObject;
  static serializeBinaryToWriter(message: SeedListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SeedListReply;
  static deserializeBinaryFromReader(message: SeedListReply, reader: jspb.BinaryReader): SeedListReply;
}

export namespace SeedListReply {
  export type AsObject = {
    valueList: Array<veidemann_api_config_pb.Seed.AsObject>,
    count: number,
    pageSize: number,
    page: number,
  }
}

export class CrawlJobListReply extends jspb.Message {
  getValueList(): Array<veidemann_api_config_pb.CrawlJob>;
  setValueList(value: Array<veidemann_api_config_pb.CrawlJob>): void;
  clearValueList(): void;
  addValue(value?: veidemann_api_config_pb.CrawlJob, index?: number): veidemann_api_config_pb.CrawlJob;

  getCount(): number;
  setCount(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlJobListReply.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlJobListReply): CrawlJobListReply.AsObject;
  static serializeBinaryToWriter(message: CrawlJobListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlJobListReply;
  static deserializeBinaryFromReader(message: CrawlJobListReply, reader: jspb.BinaryReader): CrawlJobListReply;
}

export namespace CrawlJobListReply {
  export type AsObject = {
    valueList: Array<veidemann_api_config_pb.CrawlJob.AsObject>,
    count: number,
    pageSize: number,
    page: number,
  }
}

export class CrawlConfigListReply extends jspb.Message {
  getValueList(): Array<veidemann_api_config_pb.CrawlConfig>;
  setValueList(value: Array<veidemann_api_config_pb.CrawlConfig>): void;
  clearValueList(): void;
  addValue(value?: veidemann_api_config_pb.CrawlConfig, index?: number): veidemann_api_config_pb.CrawlConfig;

  getCount(): number;
  setCount(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlConfigListReply.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlConfigListReply): CrawlConfigListReply.AsObject;
  static serializeBinaryToWriter(message: CrawlConfigListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlConfigListReply;
  static deserializeBinaryFromReader(message: CrawlConfigListReply, reader: jspb.BinaryReader): CrawlConfigListReply;
}

export namespace CrawlConfigListReply {
  export type AsObject = {
    valueList: Array<veidemann_api_config_pb.CrawlConfig.AsObject>,
    count: number,
    pageSize: number,
    page: number,
  }
}

export class CrawlScheduleConfigListReply extends jspb.Message {
  getValueList(): Array<veidemann_api_config_pb.CrawlScheduleConfig>;
  setValueList(value: Array<veidemann_api_config_pb.CrawlScheduleConfig>): void;
  clearValueList(): void;
  addValue(value?: veidemann_api_config_pb.CrawlScheduleConfig, index?: number): veidemann_api_config_pb.CrawlScheduleConfig;

  getCount(): number;
  setCount(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlScheduleConfigListReply.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlScheduleConfigListReply): CrawlScheduleConfigListReply.AsObject;
  static serializeBinaryToWriter(message: CrawlScheduleConfigListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlScheduleConfigListReply;
  static deserializeBinaryFromReader(message: CrawlScheduleConfigListReply, reader: jspb.BinaryReader): CrawlScheduleConfigListReply;
}

export namespace CrawlScheduleConfigListReply {
  export type AsObject = {
    valueList: Array<veidemann_api_config_pb.CrawlScheduleConfig.AsObject>,
    count: number,
    pageSize: number,
    page: number,
  }
}

export class PolitenessConfigListReply extends jspb.Message {
  getValueList(): Array<veidemann_api_config_pb.PolitenessConfig>;
  setValueList(value: Array<veidemann_api_config_pb.PolitenessConfig>): void;
  clearValueList(): void;
  addValue(value?: veidemann_api_config_pb.PolitenessConfig, index?: number): veidemann_api_config_pb.PolitenessConfig;

  getCount(): number;
  setCount(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PolitenessConfigListReply.AsObject;
  static toObject(includeInstance: boolean, msg: PolitenessConfigListReply): PolitenessConfigListReply.AsObject;
  static serializeBinaryToWriter(message: PolitenessConfigListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PolitenessConfigListReply;
  static deserializeBinaryFromReader(message: PolitenessConfigListReply, reader: jspb.BinaryReader): PolitenessConfigListReply;
}

export namespace PolitenessConfigListReply {
  export type AsObject = {
    valueList: Array<veidemann_api_config_pb.PolitenessConfig.AsObject>,
    count: number,
    pageSize: number,
    page: number,
  }
}

export class BrowserConfigListReply extends jspb.Message {
  getValueList(): Array<veidemann_api_config_pb.BrowserConfig>;
  setValueList(value: Array<veidemann_api_config_pb.BrowserConfig>): void;
  clearValueList(): void;
  addValue(value?: veidemann_api_config_pb.BrowserConfig, index?: number): veidemann_api_config_pb.BrowserConfig;

  getCount(): number;
  setCount(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BrowserConfigListReply.AsObject;
  static toObject(includeInstance: boolean, msg: BrowserConfigListReply): BrowserConfigListReply.AsObject;
  static serializeBinaryToWriter(message: BrowserConfigListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BrowserConfigListReply;
  static deserializeBinaryFromReader(message: BrowserConfigListReply, reader: jspb.BinaryReader): BrowserConfigListReply;
}

export namespace BrowserConfigListReply {
  export type AsObject = {
    valueList: Array<veidemann_api_config_pb.BrowserConfig.AsObject>,
    count: number,
    pageSize: number,
    page: number,
  }
}

export class BrowserScriptListReply extends jspb.Message {
  getValueList(): Array<veidemann_api_config_pb.BrowserScript>;
  setValueList(value: Array<veidemann_api_config_pb.BrowserScript>): void;
  clearValueList(): void;
  addValue(value?: veidemann_api_config_pb.BrowserScript, index?: number): veidemann_api_config_pb.BrowserScript;

  getCount(): number;
  setCount(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BrowserScriptListReply.AsObject;
  static toObject(includeInstance: boolean, msg: BrowserScriptListReply): BrowserScriptListReply.AsObject;
  static serializeBinaryToWriter(message: BrowserScriptListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BrowserScriptListReply;
  static deserializeBinaryFromReader(message: BrowserScriptListReply, reader: jspb.BinaryReader): BrowserScriptListReply;
}

export namespace BrowserScriptListReply {
  export type AsObject = {
    valueList: Array<veidemann_api_config_pb.BrowserScript.AsObject>,
    count: number,
    pageSize: number,
    page: number,
  }
}

export class CrawlHostGroupConfigListReply extends jspb.Message {
  getValueList(): Array<veidemann_api_config_pb.CrawlHostGroupConfig>;
  setValueList(value: Array<veidemann_api_config_pb.CrawlHostGroupConfig>): void;
  clearValueList(): void;
  addValue(value?: veidemann_api_config_pb.CrawlHostGroupConfig, index?: number): veidemann_api_config_pb.CrawlHostGroupConfig;

  getCount(): number;
  setCount(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlHostGroupConfigListReply.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlHostGroupConfigListReply): CrawlHostGroupConfigListReply.AsObject;
  static serializeBinaryToWriter(message: CrawlHostGroupConfigListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlHostGroupConfigListReply;
  static deserializeBinaryFromReader(message: CrawlHostGroupConfigListReply, reader: jspb.BinaryReader): CrawlHostGroupConfigListReply;
}

export namespace CrawlHostGroupConfigListReply {
  export type AsObject = {
    valueList: Array<veidemann_api_config_pb.CrawlHostGroupConfig.AsObject>,
    count: number,
    pageSize: number,
    page: number,
  }
}

export class RunCrawlRequest extends jspb.Message {
  getJobId(): string;
  setJobId(value: string): void;

  getSeedId(): string;
  setSeedId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunCrawlRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RunCrawlRequest): RunCrawlRequest.AsObject;
  static serializeBinaryToWriter(message: RunCrawlRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunCrawlRequest;
  static deserializeBinaryFromReader(message: RunCrawlRequest, reader: jspb.BinaryReader): RunCrawlRequest;
}

export namespace RunCrawlRequest {
  export type AsObject = {
    jobId: string,
    seedId: string,
  }
}

export class RunCrawlReply extends jspb.Message {
  getJobExecutionId(): string;
  setJobExecutionId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunCrawlReply.AsObject;
  static toObject(includeInstance: boolean, msg: RunCrawlReply): RunCrawlReply.AsObject;
  static serializeBinaryToWriter(message: RunCrawlReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunCrawlReply;
  static deserializeBinaryFromReader(message: RunCrawlReply, reader: jspb.BinaryReader): RunCrawlReply;
}

export namespace RunCrawlReply {
  export type AsObject = {
    jobExecutionId: string,
  }
}

export class RoleList extends jspb.Message {
  getRoleList(): Array<veidemann_api_config_pb.Role>;
  setRoleList(value: Array<veidemann_api_config_pb.Role>): void;
  clearRoleList(): void;
  addRole(value: veidemann_api_config_pb.Role, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoleList.AsObject;
  static toObject(includeInstance: boolean, msg: RoleList): RoleList.AsObject;
  static serializeBinaryToWriter(message: RoleList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoleList;
  static deserializeBinaryFromReader(message: RoleList, reader: jspb.BinaryReader): RoleList;
}

export namespace RoleList {
  export type AsObject = {
    roleList: Array<veidemann_api_config_pb.Role>,
  }
}

export class RoleMappingsListRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoleMappingsListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RoleMappingsListRequest): RoleMappingsListRequest.AsObject;
  static serializeBinaryToWriter(message: RoleMappingsListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoleMappingsListRequest;
  static deserializeBinaryFromReader(message: RoleMappingsListRequest, reader: jspb.BinaryReader): RoleMappingsListRequest;
}

export namespace RoleMappingsListRequest {
  export type AsObject = {
    id: string,
    pageSize: number,
    page: number,
  }
}

export class RoleMappingsListReply extends jspb.Message {
  getValueList(): Array<veidemann_api_config_pb.RoleMapping>;
  setValueList(value: Array<veidemann_api_config_pb.RoleMapping>): void;
  clearValueList(): void;
  addValue(value?: veidemann_api_config_pb.RoleMapping, index?: number): veidemann_api_config_pb.RoleMapping;

  getCount(): number;
  setCount(value: number): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getPage(): number;
  setPage(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoleMappingsListReply.AsObject;
  static toObject(includeInstance: boolean, msg: RoleMappingsListReply): RoleMappingsListReply.AsObject;
  static serializeBinaryToWriter(message: RoleMappingsListReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoleMappingsListReply;
  static deserializeBinaryFromReader(message: RoleMappingsListReply, reader: jspb.BinaryReader): RoleMappingsListReply;
}

export namespace RoleMappingsListReply {
  export type AsObject = {
    valueList: Array<veidemann_api_config_pb.RoleMapping.AsObject>,
    count: number,
    pageSize: number,
    page: number,
  }
}

export class OpenIdConnectIssuerReply extends jspb.Message {
  getOpenIdConnectIssuer(): string;
  setOpenIdConnectIssuer(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OpenIdConnectIssuerReply.AsObject;
  static toObject(includeInstance: boolean, msg: OpenIdConnectIssuerReply): OpenIdConnectIssuerReply.AsObject;
  static serializeBinaryToWriter(message: OpenIdConnectIssuerReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OpenIdConnectIssuerReply;
  static deserializeBinaryFromReader(message: OpenIdConnectIssuerReply, reader: jspb.BinaryReader): OpenIdConnectIssuerReply;
}

export namespace OpenIdConnectIssuerReply {
  export type AsObject = {
    openIdConnectIssuer: string,
  }
}

