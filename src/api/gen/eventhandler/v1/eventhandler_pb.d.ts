import * as jspb from "google-protobuf"

import * as eventhandler_v1_resources_pb from '../../eventhandler/v1/resources_pb';
import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';

export class ListRequest extends jspb.Message {
  getIdList(): Array<string>;
  setIdList(value: Array<string>): void;
  clearIdList(): void;
  addId(value: string, index?: number): void;

  getQueryTemplate(): eventhandler_v1_resources_pb.EventObject | undefined;
  setQueryTemplate(value?: eventhandler_v1_resources_pb.EventObject): void;
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

  getPageSize(): number;
  setPageSize(value: number): void;

  getOffset(): number;
  setOffset(value: number): void;

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
    queryTemplate?: eventhandler_v1_resources_pb.EventObject.AsObject,
    queryMask?: commons_v1_resources_pb.FieldMask.AsObject,
    returnedFieldsMask?: commons_v1_resources_pb.FieldMask.AsObject,
    pageSize: number,
    offset: number,
  }
}

export class UpdateRequest extends jspb.Message {
  getListRequest(): ListRequest | undefined;
  setListRequest(value?: ListRequest): void;
  hasListRequest(): boolean;
  clearListRequest(): void;

  getUpdateMask(): commons_v1_resources_pb.FieldMask | undefined;
  setUpdateMask(value?: commons_v1_resources_pb.FieldMask): void;
  hasUpdateMask(): boolean;
  clearUpdateMask(): void;

  getUpdateTemplate(): eventhandler_v1_resources_pb.EventObject | undefined;
  setUpdateTemplate(value?: eventhandler_v1_resources_pb.EventObject): void;
  hasUpdateTemplate(): boolean;
  clearUpdateTemplate(): void;

  getComment(): string;
  setComment(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateRequest): UpdateRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateRequest;
  static deserializeBinaryFromReader(message: UpdateRequest, reader: jspb.BinaryReader): UpdateRequest;
}

export namespace UpdateRequest {
  export type AsObject = {
    listRequest?: ListRequest.AsObject,
    updateMask?: commons_v1_resources_pb.FieldMask.AsObject,
    updateTemplate?: eventhandler_v1_resources_pb.EventObject.AsObject,
    comment: string,
  }
}

export class SaveRequest extends jspb.Message {
  getObject(): eventhandler_v1_resources_pb.EventObject | undefined;
  setObject(value?: eventhandler_v1_resources_pb.EventObject): void;
  hasObject(): boolean;
  clearObject(): void;

  getComment(): string;
  setComment(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveRequest): SaveRequest.AsObject;
  static serializeBinaryToWriter(message: SaveRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveRequest;
  static deserializeBinaryFromReader(message: SaveRequest, reader: jspb.BinaryReader): SaveRequest;
}

export namespace SaveRequest {
  export type AsObject = {
    object?: eventhandler_v1_resources_pb.EventObject.AsObject,
    comment: string,
  }
}

export class UpdateResponse extends jspb.Message {
  getUpdated(): number;
  setUpdated(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateResponse): UpdateResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateResponse;
  static deserializeBinaryFromReader(message: UpdateResponse, reader: jspb.BinaryReader): UpdateResponse;
}

export namespace UpdateResponse {
  export type AsObject = {
    updated: number,
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

export class DeleteResponse extends jspb.Message {
  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteResponse): DeleteResponse.AsObject;
  static serializeBinaryToWriter(message: DeleteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteResponse;
  static deserializeBinaryFromReader(message: DeleteResponse, reader: jspb.BinaryReader): DeleteResponse;
}

export namespace DeleteResponse {
  export type AsObject = {
    deleted: boolean,
  }
}

export class ListLabelRequest extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListLabelRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListLabelRequest): ListLabelRequest.AsObject;
  static serializeBinaryToWriter(message: ListLabelRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListLabelRequest;
  static deserializeBinaryFromReader(message: ListLabelRequest, reader: jspb.BinaryReader): ListLabelRequest;
}

export namespace ListLabelRequest {
  export type AsObject = {
    text: string,
  }
}

export class ListLabelResponse extends jspb.Message {
  getLabelList(): Array<string>;
  setLabelList(value: Array<string>): void;
  clearLabelList(): void;
  addLabel(value: string, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListLabelResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ListLabelResponse): ListLabelResponse.AsObject;
  static serializeBinaryToWriter(message: ListLabelResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListLabelResponse;
  static deserializeBinaryFromReader(message: ListLabelResponse, reader: jspb.BinaryReader): ListLabelResponse;
}

export namespace ListLabelResponse {
  export type AsObject = {
    labelList: Array<string>,
  }
}

