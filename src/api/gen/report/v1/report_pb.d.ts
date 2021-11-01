import * as jspb from 'google-protobuf'

import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as frontier_v1_resources_pb from '../../frontier/v1/resources_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class ExecuteDbQueryRequest extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): ExecuteDbQueryRequest;

  getLimit(): number;
  setLimit(value: number): ExecuteDbQueryRequest;

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
  setRecord(value: string): ExecuteDbQueryReply;

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

export class CrawlExecutionsListRequest extends jspb.Message {
  getIdList(): Array<string>;
  setIdList(value: Array<string>): CrawlExecutionsListRequest;
  clearIdList(): CrawlExecutionsListRequest;
  addId(value: string, index?: number): CrawlExecutionsListRequest;

  getStateList(): Array<frontier_v1_resources_pb.CrawlExecutionStatus.State>;
  setStateList(value: Array<frontier_v1_resources_pb.CrawlExecutionStatus.State>): CrawlExecutionsListRequest;
  clearStateList(): CrawlExecutionsListRequest;
  addState(value: frontier_v1_resources_pb.CrawlExecutionStatus.State, index?: number): CrawlExecutionsListRequest;

  getStartTimeFrom(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTimeFrom(value?: google_protobuf_timestamp_pb.Timestamp): CrawlExecutionsListRequest;
  hasStartTimeFrom(): boolean;
  clearStartTimeFrom(): CrawlExecutionsListRequest;

  getStartTimeTo(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTimeTo(value?: google_protobuf_timestamp_pb.Timestamp): CrawlExecutionsListRequest;
  hasStartTimeTo(): boolean;
  clearStartTimeTo(): CrawlExecutionsListRequest;

  getHasError(): boolean;
  setHasError(value: boolean): CrawlExecutionsListRequest;

  getQueryTemplate(): frontier_v1_resources_pb.CrawlExecutionStatus | undefined;
  setQueryTemplate(value?: frontier_v1_resources_pb.CrawlExecutionStatus): CrawlExecutionsListRequest;
  hasQueryTemplate(): boolean;
  clearQueryTemplate(): CrawlExecutionsListRequest;

  getQueryMask(): commons_v1_resources_pb.FieldMask | undefined;
  setQueryMask(value?: commons_v1_resources_pb.FieldMask): CrawlExecutionsListRequest;
  hasQueryMask(): boolean;
  clearQueryMask(): CrawlExecutionsListRequest;

  getReturnedFieldsMask(): commons_v1_resources_pb.FieldMask | undefined;
  setReturnedFieldsMask(value?: commons_v1_resources_pb.FieldMask): CrawlExecutionsListRequest;
  hasReturnedFieldsMask(): boolean;
  clearReturnedFieldsMask(): CrawlExecutionsListRequest;

  getOrderByPath(): string;
  setOrderByPath(value: string): CrawlExecutionsListRequest;

  getOrderDescending(): boolean;
  setOrderDescending(value: boolean): CrawlExecutionsListRequest;

  getWatch(): boolean;
  setWatch(value: boolean): CrawlExecutionsListRequest;

  getPageSize(): number;
  setPageSize(value: number): CrawlExecutionsListRequest;

  getOffset(): number;
  setOffset(value: number): CrawlExecutionsListRequest;

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
  setIdList(value: Array<string>): JobExecutionsListRequest;
  clearIdList(): JobExecutionsListRequest;
  addId(value: string, index?: number): JobExecutionsListRequest;

  getStateList(): Array<frontier_v1_resources_pb.JobExecutionStatus.State>;
  setStateList(value: Array<frontier_v1_resources_pb.JobExecutionStatus.State>): JobExecutionsListRequest;
  clearStateList(): JobExecutionsListRequest;
  addState(value: frontier_v1_resources_pb.JobExecutionStatus.State, index?: number): JobExecutionsListRequest;

  getStartTimeFrom(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTimeFrom(value?: google_protobuf_timestamp_pb.Timestamp): JobExecutionsListRequest;
  hasStartTimeFrom(): boolean;
  clearStartTimeFrom(): JobExecutionsListRequest;

  getStartTimeTo(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTimeTo(value?: google_protobuf_timestamp_pb.Timestamp): JobExecutionsListRequest;
  hasStartTimeTo(): boolean;
  clearStartTimeTo(): JobExecutionsListRequest;

  getQueryTemplate(): frontier_v1_resources_pb.JobExecutionStatus | undefined;
  setQueryTemplate(value?: frontier_v1_resources_pb.JobExecutionStatus): JobExecutionsListRequest;
  hasQueryTemplate(): boolean;
  clearQueryTemplate(): JobExecutionsListRequest;

  getQueryMask(): commons_v1_resources_pb.FieldMask | undefined;
  setQueryMask(value?: commons_v1_resources_pb.FieldMask): JobExecutionsListRequest;
  hasQueryMask(): boolean;
  clearQueryMask(): JobExecutionsListRequest;

  getReturnedFieldsMask(): commons_v1_resources_pb.FieldMask | undefined;
  setReturnedFieldsMask(value?: commons_v1_resources_pb.FieldMask): JobExecutionsListRequest;
  hasReturnedFieldsMask(): boolean;
  clearReturnedFieldsMask(): JobExecutionsListRequest;

  getOrderByPath(): string;
  setOrderByPath(value: string): JobExecutionsListRequest;

  getOrderDescending(): boolean;
  setOrderDescending(value: boolean): JobExecutionsListRequest;

  getWatch(): boolean;
  setWatch(value: boolean): JobExecutionsListRequest;

  getPageSize(): number;
  setPageSize(value: number): JobExecutionsListRequest;

  getOffset(): number;
  setOffset(value: number): JobExecutionsListRequest;

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

