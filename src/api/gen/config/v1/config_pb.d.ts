import * as jspb from "google-protobuf"

import * as config_v1_resources_pb from '../../config/v1/resources_pb';
import * as google_api_annotations_pb from '../../google/api/annotations_pb';
import * as protoc$gen$swagger_options_annotations_pb from '../../protoc-gen-swagger/options/annotations_pb';

export class GetLabelKeysRequest extends jspb.Message {
  constructor ();
  getKind():config_v1_resources_pb.Kind;
  setKind(value:config_v1_resources_pb.Kind): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLabelKeysRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLabelKeysRequest): GetLabelKeysRequest.AsObject;
  static serializeBinaryToWriter(message: GetLabelKeysRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLabelKeysRequest;
  static deserializeBinaryFromReader(message: GetLabelKeysRequest, reader: jspb.BinaryReader): GetLabelKeysRequest;
}

export namespace GetLabelKeysRequest {
  export type AsObject = {
    kind:config_v1_resources_pb.Kind;
  }
}

export class ListRequest extends jspb.Message {
  constructor ();
  getKind():config_v1_resources_pb.Kind;
  setKind(value:config_v1_resources_pb.Kind): void;
  getIdList(): string[];
  setIdList(value: string[]): void;
  clearIdList(): void;
  getNameRegex(): string;
  setNameRegex(value: string): void;
  getLabelSelectorList(): string[];
  setLabelSelectorList(value: string[]): void;
  clearLabelSelectorList(): void;
  getQueryTemplate(): config_v1_resources_pb.ConfigObject | undefined;
  setQueryTemplate(value?: config_v1_resources_pb.ConfigObject): void;
  clearQueryTemplate(): void;
  getQueryMask(): FieldMask | undefined;
  setQueryMask(value?: FieldMask): void;
  clearQueryMask(): void;
  getReturnedFieldsMask(): FieldMask | undefined;
  setReturnedFieldsMask(value?: FieldMask): void;
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
    kind:config_v1_resources_pb.Kind;
    idList: string[];
    nameRegex: string;
    labelSelectorList: string[];
    queryTemplate?: config_v1_resources_pb.ConfigObject.AsObject;
    queryMask?: FieldMask.AsObject;
    returnedFieldsMask?: FieldMask.AsObject;
    orderByPath: string;
    orderDescending: boolean;
    pageSize: number;
    offset: number;
  }
}

export class UpdateRequest extends jspb.Message {
  constructor ();
  getListRequest(): ListRequest | undefined;
  setListRequest(value?: ListRequest): void;
  clearListRequest(): void;
  getUpdateMask(): FieldMask | undefined;
  setUpdateMask(value?: FieldMask): void;
  clearUpdateMask(): void;
  getUpdateTemplate(): config_v1_resources_pb.ConfigObject | undefined;
  setUpdateTemplate(value?: config_v1_resources_pb.ConfigObject): void;
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
    listRequest?: ListRequest.AsObject;
    updateMask?: FieldMask.AsObject;
    updateTemplate?: config_v1_resources_pb.ConfigObject.AsObject;
  }
}

export class UpdateResponse extends jspb.Message {
  constructor ();
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
    updated: number;
  }
}

export class ListCountResponse extends jspb.Message {
  constructor ();
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
    count: number;
    approximate: boolean;
  }
}

export class DeleteResponse extends jspb.Message {
  constructor ();
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
    deleted: boolean;
  }
}

export class LabelKeysResponse extends jspb.Message {
  constructor ();
  getKeyList(): string[];
  setKeyList(value: string[]): void;
  clearKeyList(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LabelKeysResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LabelKeysResponse): LabelKeysResponse.AsObject;
  static serializeBinaryToWriter(message: LabelKeysResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LabelKeysResponse;
  static deserializeBinaryFromReader(message: LabelKeysResponse, reader: jspb.BinaryReader): LabelKeysResponse;
}

export namespace LabelKeysResponse {
  export type AsObject = {
    keyList: string[];
  }
}

export class FieldMask extends jspb.Message {
  constructor ();
  getPathsList(): string[];
  setPathsList(value: string[]): void;
  clearPathsList(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FieldMask.AsObject;
  static toObject(includeInstance: boolean, msg: FieldMask): FieldMask.AsObject;
  static serializeBinaryToWriter(message: FieldMask, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FieldMask;
  static deserializeBinaryFromReader(message: FieldMask, reader: jspb.BinaryReader): FieldMask;
}

export namespace FieldMask {
  export type AsObject = {
    pathsList: string[];
  }
}

