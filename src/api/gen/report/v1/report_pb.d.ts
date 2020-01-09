import * as jspb from "google-protobuf"

import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as frontier_v1_resources_pb from '../../frontier/v1/resources_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class CrawlLogListRequest extends jspb.Message {
  getWarcIdList(): Array<string>;
  setWarcIdList(value: Array<string>): void;
  clearWarcIdList(): void;
  addWarcId(value: string, index?: number): void;

  getQueryTemplate(): frontier_v1_resources_pb.CrawlLog | undefined;
  setQueryTemplate(value?: frontier_v1_resources_pb.CrawlLog): void;
  hasQueryTemplate(): boolean;
  clearQueryTemplate(): void;

  getQueryMask(): commons_v1_resources_pb.FieldMask | undefined;
  setQueryMask(value?: commons_v1_resources_pb.FieldMask): void;
  hasQueryMask(): boolean;
  clearQueryMask(): void;

  getReturnedFieldsMask(): commons_v1_resources_pb.FieldMask | undefined;
  setReturnedFieldsMask(value?: commons_v1_resources_pb.FieldMask): void;
  hasReturnedFieldsMask(): boolean;
  clearReturnedFieldsMask(): void;

  getOrderByPath(): string;
  setOrderByPath(value: string): void;

  getOrderDescending(): boolean;
  setOrderDescending(value: boolean): void;

  getWatch(): boolean;
  setWatch(value: boolean): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getOffset(): number;
  setOffset(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlLogListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlLogListRequest): CrawlLogListRequest.AsObject;
  static serializeBinaryToWriter(message: CrawlLogListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlLogListRequest;
  static deserializeBinaryFromReader(message: CrawlLogListRequest, reader: jspb.BinaryReader): CrawlLogListRequest;
}

export namespace CrawlLogListRequest {
  export type AsObject = {
    warcIdList: Array<string>,
    queryTemplate?: frontier_v1_resources_pb.CrawlLog.AsObject,
    queryMask?: commons_v1_resources_pb.FieldMask.AsObject,
    returnedFieldsMask?: commons_v1_resources_pb.FieldMask.AsObject,
    orderByPath: string,
    orderDescending: boolean,
    watch: boolean,
    pageSize: number,
    offset: number,
  }
}

export class PageLogListRequest extends jspb.Message {
  getWarcIdList(): Array<string>;
  setWarcIdList(value: Array<string>): void;
  clearWarcIdList(): void;
  addWarcId(value: string, index?: number): void;

  getQueryTemplate(): frontier_v1_resources_pb.PageLog | undefined;
  setQueryTemplate(value?: frontier_v1_resources_pb.PageLog): void;
  hasQueryTemplate(): boolean;
  clearQueryTemplate(): void;

  getQueryMask(): commons_v1_resources_pb.FieldMask | undefined;
  setQueryMask(value?: commons_v1_resources_pb.FieldMask): void;
  hasQueryMask(): boolean;
  clearQueryMask(): void;

  getReturnedFieldsMask(): commons_v1_resources_pb.FieldMask | undefined;
  setReturnedFieldsMask(value?: commons_v1_resources_pb.FieldMask): void;
  hasReturnedFieldsMask(): boolean;
  clearReturnedFieldsMask(): void;

  getOrderByPath(): string;
  setOrderByPath(value: string): void;

  getOrderDescending(): boolean;
  setOrderDescending(value: boolean): void;

  getWatch(): boolean;
  setWatch(value: boolean): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getOffset(): number;
  setOffset(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PageLogListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PageLogListRequest): PageLogListRequest.AsObject;
  static serializeBinaryToWriter(message: PageLogListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PageLogListRequest;
  static deserializeBinaryFromReader(message: PageLogListRequest, reader: jspb.BinaryReader): PageLogListRequest;
}

export namespace PageLogListRequest {
  export type AsObject = {
    warcIdList: Array<string>,
    queryTemplate?: frontier_v1_resources_pb.PageLog.AsObject,
    queryMask?: commons_v1_resources_pb.FieldMask.AsObject,
    returnedFieldsMask?: commons_v1_resources_pb.FieldMask.AsObject,
    orderByPath: string,
    orderDescending: boolean,
    watch: boolean,
    pageSize: number,
    offset: number,
  }
}

export class ExecuteDbQueryRequest extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): void;

  getLimit(): number;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteDbQueryRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteDbQueryRequest): ExecuteDbQueryRequest.AsObject;
  static serializeBinaryToWriter(message: ExecuteDbQueryRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteDbQueryRequest;
  static deserializeBinaryFromReader(message: ExecuteDbQueryRequest, reader: jspb.BinaryReader): ExecuteDbQueryRequest;
}

export namespace ExecuteDbQueryRequest {
  export type AsObject = {
    query: string,
    limit: number,
  }
}

export class ExecuteDbQueryReply extends jspb.Message {
  getRecord(): string;
  setRecord(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteDbQueryReply.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteDbQueryReply): ExecuteDbQueryReply.AsObject;
  static serializeBinaryToWriter(message: ExecuteDbQueryReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteDbQueryReply;
  static deserializeBinaryFromReader(message: ExecuteDbQueryReply, reader: jspb.BinaryReader): ExecuteDbQueryReply;
}

export namespace ExecuteDbQueryReply {
  export type AsObject = {
    record: string,
  }
}

export class ListCountResponse extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  getApproximate(): boolean;
  setApproximate(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListCountResponse): ListCountResponse.AsObject;
  static serializeBinaryToWriter(message: ListCountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCountResponse;
  static deserializeBinaryFromReader(message: ListCountResponse, reader: jspb.BinaryReader): ListCountResponse;
}

export namespace ListCountResponse {
  export type AsObject = {
    count: number,
    approximate: boolean,
  }
}

export class CrawlExecutionsListRequest extends jspb.Message {
  getIdList(): Array<string>;
  setIdList(value: Array<string>): void;
  clearIdList(): void;
  addId(value: string, index?: number): void;

  getStateList(): Array<frontier_v1_resources_pb.CrawlExecutionStatus.State>;
  setStateList(value: Array<frontier_v1_resources_pb.CrawlExecutionStatus.State>): void;
  clearStateList(): void;
  addState(value: frontier_v1_resources_pb.CrawlExecutionStatus.State, index?: number): void;

  getStartTimeFrom(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTimeFrom(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasStartTimeFrom(): boolean;
  clearStartTimeFrom(): void;

  getStartTimeTo(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTimeTo(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasStartTimeTo(): boolean;
  clearStartTimeTo(): void;

  getHasError(): boolean;
  setHasError(value: boolean): void;

  getQueryTemplate(): frontier_v1_resources_pb.CrawlExecutionStatus | undefined;
  setQueryTemplate(value?: frontier_v1_resources_pb.CrawlExecutionStatus): void;
  hasQueryTemplate(): boolean;
  clearQueryTemplate(): void;

  getQueryMask(): commons_v1_resources_pb.FieldMask | undefined;
  setQueryMask(value?: commons_v1_resources_pb.FieldMask): void;
  hasQueryMask(): boolean;
  clearQueryMask(): void;

  getReturnedFieldsMask(): commons_v1_resources_pb.FieldMask | undefined;
  setReturnedFieldsMask(value?: commons_v1_resources_pb.FieldMask): void;
  hasReturnedFieldsMask(): boolean;
  clearReturnedFieldsMask(): void;

  getOrderByPath(): string;
  setOrderByPath(value: string): void;

  getOrderDescending(): boolean;
  setOrderDescending(value: boolean): void;

  getWatch(): boolean;
  setWatch(value: boolean): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getOffset(): number;
  setOffset(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlExecutionsListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlExecutionsListRequest): CrawlExecutionsListRequest.AsObject;
  static serializeBinaryToWriter(message: CrawlExecutionsListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlExecutionsListRequest;
  static deserializeBinaryFromReader(message: CrawlExecutionsListRequest, reader: jspb.BinaryReader): CrawlExecutionsListRequest;
}

export namespace CrawlExecutionsListRequest {
  export type AsObject = {
    idList: Array<string>,
    stateList: Array<frontier_v1_resources_pb.CrawlExecutionStatus.State>,
    startTimeFrom?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    startTimeTo?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    hasError: boolean,
    queryTemplate?: frontier_v1_resources_pb.CrawlExecutionStatus.AsObject,
    queryMask?: commons_v1_resources_pb.FieldMask.AsObject,
    returnedFieldsMask?: commons_v1_resources_pb.FieldMask.AsObject,
    orderByPath: string,
    orderDescending: boolean,
    watch: boolean,
    pageSize: number,
    offset: number,
  }
}

export class JobExecutionsListRequest extends jspb.Message {
  getIdList(): Array<string>;
  setIdList(value: Array<string>): void;
  clearIdList(): void;
  addId(value: string, index?: number): void;

  getStateList(): Array<frontier_v1_resources_pb.JobExecutionStatus.State>;
  setStateList(value: Array<frontier_v1_resources_pb.JobExecutionStatus.State>): void;
  clearStateList(): void;
  addState(value: frontier_v1_resources_pb.JobExecutionStatus.State, index?: number): void;

  getStartTimeFrom(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTimeFrom(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasStartTimeFrom(): boolean;
  clearStartTimeFrom(): void;

  getStartTimeTo(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTimeTo(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasStartTimeTo(): boolean;
  clearStartTimeTo(): void;

  getQueryTemplate(): frontier_v1_resources_pb.JobExecutionStatus | undefined;
  setQueryTemplate(value?: frontier_v1_resources_pb.JobExecutionStatus): void;
  hasQueryTemplate(): boolean;
  clearQueryTemplate(): void;

  getQueryMask(): commons_v1_resources_pb.FieldMask | undefined;
  setQueryMask(value?: commons_v1_resources_pb.FieldMask): void;
  hasQueryMask(): boolean;
  clearQueryMask(): void;

  getReturnedFieldsMask(): commons_v1_resources_pb.FieldMask | undefined;
  setReturnedFieldsMask(value?: commons_v1_resources_pb.FieldMask): void;
  hasReturnedFieldsMask(): boolean;
  clearReturnedFieldsMask(): void;

  getOrderByPath(): string;
  setOrderByPath(value: string): void;

  getOrderDescending(): boolean;
  setOrderDescending(value: boolean): void;

  getWatch(): boolean;
  setWatch(value: boolean): void;

  getPageSize(): number;
  setPageSize(value: number): void;

  getOffset(): number;
  setOffset(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JobExecutionsListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: JobExecutionsListRequest): JobExecutionsListRequest.AsObject;
  static serializeBinaryToWriter(message: JobExecutionsListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JobExecutionsListRequest;
  static deserializeBinaryFromReader(message: JobExecutionsListRequest, reader: jspb.BinaryReader): JobExecutionsListRequest;
}

export namespace JobExecutionsListRequest {
  export type AsObject = {
    idList: Array<string>,
    stateList: Array<frontier_v1_resources_pb.JobExecutionStatus.State>,
    startTimeFrom?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    startTimeTo?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    queryTemplate?: frontier_v1_resources_pb.JobExecutionStatus.AsObject,
    queryMask?: commons_v1_resources_pb.FieldMask.AsObject,
    returnedFieldsMask?: commons_v1_resources_pb.FieldMask.AsObject,
    orderByPath: string,
    orderDescending: boolean,
    watch: boolean,
    pageSize: number,
    offset: number,
  }
}

