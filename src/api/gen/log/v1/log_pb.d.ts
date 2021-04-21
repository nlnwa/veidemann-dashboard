import * as jspb from 'google-protobuf'

import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as log_v1_resources_pb from '../../log/v1/resources_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class CrawlLogListRequest extends jspb.Message {
  getWarcIdList(): Array<string>;
  setWarcIdList(value: Array<string>): CrawlLogListRequest;
  clearWarcIdList(): CrawlLogListRequest;
  addWarcId(value: string, index?: number): CrawlLogListRequest;

  getQueryTemplate(): log_v1_resources_pb.CrawlLog | undefined;
  setQueryTemplate(value?: log_v1_resources_pb.CrawlLog): CrawlLogListRequest;
  hasQueryTemplate(): boolean;
  clearQueryTemplate(): CrawlLogListRequest;

  getQueryMask(): commons_v1_resources_pb.FieldMask | undefined;
  setQueryMask(value?: commons_v1_resources_pb.FieldMask): CrawlLogListRequest;
  hasQueryMask(): boolean;
  clearQueryMask(): CrawlLogListRequest;

  getReturnedFieldsMask(): commons_v1_resources_pb.FieldMask | undefined;
  setReturnedFieldsMask(value?: commons_v1_resources_pb.FieldMask): CrawlLogListRequest;
  hasReturnedFieldsMask(): boolean;
  clearReturnedFieldsMask(): CrawlLogListRequest;

  getOrderByPath(): string;
  setOrderByPath(value: string): CrawlLogListRequest;

  getOrderDescending(): boolean;
  setOrderDescending(value: boolean): CrawlLogListRequest;

  getWatch(): boolean;
  setWatch(value: boolean): CrawlLogListRequest;

  getPageSize(): number;
  setPageSize(value: number): CrawlLogListRequest;

  getOffset(): number;
  setOffset(value: number): CrawlLogListRequest;

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
    queryTemplate?: log_v1_resources_pb.CrawlLog.AsObject,
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
  setWarcIdList(value: Array<string>): PageLogListRequest;
  clearWarcIdList(): PageLogListRequest;
  addWarcId(value: string, index?: number): PageLogListRequest;

  getQueryTemplate(): log_v1_resources_pb.PageLog | undefined;
  setQueryTemplate(value?: log_v1_resources_pb.PageLog): PageLogListRequest;
  hasQueryTemplate(): boolean;
  clearQueryTemplate(): PageLogListRequest;

  getQueryMask(): commons_v1_resources_pb.FieldMask | undefined;
  setQueryMask(value?: commons_v1_resources_pb.FieldMask): PageLogListRequest;
  hasQueryMask(): boolean;
  clearQueryMask(): PageLogListRequest;

  getReturnedFieldsMask(): commons_v1_resources_pb.FieldMask | undefined;
  setReturnedFieldsMask(value?: commons_v1_resources_pb.FieldMask): PageLogListRequest;
  hasReturnedFieldsMask(): boolean;
  clearReturnedFieldsMask(): PageLogListRequest;

  getOrderByPath(): string;
  setOrderByPath(value: string): PageLogListRequest;

  getOrderDescending(): boolean;
  setOrderDescending(value: boolean): PageLogListRequest;

  getWatch(): boolean;
  setWatch(value: boolean): PageLogListRequest;

  getPageSize(): number;
  setPageSize(value: number): PageLogListRequest;

  getOffset(): number;
  setOffset(value: number): PageLogListRequest;

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
    queryTemplate?: log_v1_resources_pb.PageLog.AsObject,
    queryMask?: commons_v1_resources_pb.FieldMask.AsObject,
    returnedFieldsMask?: commons_v1_resources_pb.FieldMask.AsObject,
    orderByPath: string,
    orderDescending: boolean,
    watch: boolean,
    pageSize: number,
    offset: number,
  }
}

export class WritePageLogRequest extends jspb.Message {
  getCrawllog(): log_v1_resources_pb.CrawlLog | undefined;
  setCrawllog(value?: log_v1_resources_pb.CrawlLog): WritePageLogRequest;
  hasCrawllog(): boolean;
  clearCrawllog(): WritePageLogRequest;

  getResource(): log_v1_resources_pb.PageLog.Resource | undefined;
  setResource(value?: log_v1_resources_pb.PageLog.Resource): WritePageLogRequest;
  hasResource(): boolean;
  clearResource(): WritePageLogRequest;

  getOutlink(): string;
  setOutlink(value: string): WritePageLogRequest;

  getValueCase(): WritePageLogRequest.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WritePageLogRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WritePageLogRequest): WritePageLogRequest.AsObject;
  static serializeBinaryToWriter(message: WritePageLogRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WritePageLogRequest;
  static deserializeBinaryFromReader(message: WritePageLogRequest, reader: jspb.BinaryReader): WritePageLogRequest;
}

export namespace WritePageLogRequest {
  export type AsObject = {
    crawllog?: log_v1_resources_pb.CrawlLog.AsObject,
    resource?: log_v1_resources_pb.PageLog.Resource.AsObject,
    outlink: string,
  }

  export enum ValueCase { 
    VALUE_NOT_SET = 0,
    CRAWLLOG = 1,
    RESOURCE = 2,
    OUTLINK = 3,
  }
}

export class WriteCrawlLogRequest extends jspb.Message {
  getCrawllog(): log_v1_resources_pb.CrawlLog | undefined;
  setCrawllog(value?: log_v1_resources_pb.CrawlLog): WriteCrawlLogRequest;
  hasCrawllog(): boolean;
  clearCrawllog(): WriteCrawlLogRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WriteCrawlLogRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WriteCrawlLogRequest): WriteCrawlLogRequest.AsObject;
  static serializeBinaryToWriter(message: WriteCrawlLogRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WriteCrawlLogRequest;
  static deserializeBinaryFromReader(message: WriteCrawlLogRequest, reader: jspb.BinaryReader): WriteCrawlLogRequest;
}

export namespace WriteCrawlLogRequest {
  export type AsObject = {
    crawllog?: log_v1_resources_pb.CrawlLog.AsObject,
  }
}

