import * as jspb from "google-protobuf"

import * as config_v1_resources_pb from '../../config/v1/resources_pb';
import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

export class GetLabelKeysRequest extends jspb.Message {
  getKind(): config_v1_resources_pb.Kind;
  setKind(value: config_v1_resources_pb.Kind): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLabelKeysRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLabelKeysRequest): GetLabelKeysRequest.AsObject;
  static serializeBinaryToWriter(message: GetLabelKeysRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLabelKeysRequest;
  static deserializeBinaryFromReader(message: GetLabelKeysRequest, reader: jspb.BinaryReader): GetLabelKeysRequest;
}

export namespace GetLabelKeysRequest {
  export type AsObject = {
    kind: config_v1_resources_pb.Kind,
  }
}

export class ListRequest extends jspb.Message {
  getKind(): config_v1_resources_pb.Kind;
  setKind(value: config_v1_resources_pb.Kind): void;

  getIdList(): Array<string>;
  setIdList(value: Array<string>): void;
  clearIdList(): void;
  addId(value: string, index?: number): void;

  getNameRegex(): string;
  setNameRegex(value: string): void;

  getLabelSelectorList(): Array<string>;
  setLabelSelectorList(value: Array<string>): void;
  clearLabelSelectorList(): void;
  addLabelSelector(value: string, index?: number): void;

  getQueryTemplate(): config_v1_resources_pb.ConfigObject | undefined;
  setQueryTemplate(value?: config_v1_resources_pb.ConfigObject): void;
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
    kind: config_v1_resources_pb.Kind,
    idList: Array<string>,
    nameRegex: string,
    labelSelectorList: Array<string>,
    queryTemplate?: config_v1_resources_pb.ConfigObject.AsObject,
    queryMask?: commons_v1_resources_pb.FieldMask.AsObject,
    returnedFieldsMask?: commons_v1_resources_pb.FieldMask.AsObject,
    orderByPath: string,
    orderDescending: boolean,
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

  getUpdateTemplate(): config_v1_resources_pb.ConfigObject | undefined;
  setUpdateTemplate(value?: config_v1_resources_pb.ConfigObject): void;
  hasUpdateTemplate(): boolean;
  clearUpdateTemplate(): void;

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
    updateTemplate?: config_v1_resources_pb.ConfigObject.AsObject,
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

export class LabelKeysResponse extends jspb.Message {
  getKeyList(): Array<string>;
  setKeyList(value: Array<string>): void;
  clearKeyList(): void;
  addKey(value: string, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LabelKeysResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LabelKeysResponse): LabelKeysResponse.AsObject;
  static serializeBinaryToWriter(message: LabelKeysResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LabelKeysResponse;
  static deserializeBinaryFromReader(message: LabelKeysResponse, reader: jspb.BinaryReader): LabelKeysResponse;
}

export namespace LabelKeysResponse {
  export type AsObject = {
    keyList: Array<string>,
  }
}

