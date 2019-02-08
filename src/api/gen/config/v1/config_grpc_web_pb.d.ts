import * as grpcWeb from 'grpc-web';

import * as config_v1_resources_pb from '../../config/v1/resources_pb';
import * as google_api_annotations_pb from '../../google/api/annotations_pb';
import * as protoc$gen$swagger_options_annotations_pb from '../../protoc-gen-swagger/options/annotations_pb';

import {
  DeleteResponse,
  GetLabelKeysRequest,
  LabelKeysResponse,
  ListCountResponse,
  ListRequest,
  UpdateRequest,
  UpdateResponse} from './config_pb';

export class ConfigClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getConfigObject(
    request: config_v1_resources_pb.ConfigRef,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: config_v1_resources_pb.ConfigObject) => void
  ): grpcWeb.ClientReadableStream<config_v1_resources_pb.ConfigObject>;

  listConfigObjects(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<config_v1_resources_pb.ConfigObject>;

  countConfigObjects(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ListCountResponse) => void
  ): grpcWeb.ClientReadableStream<ListCountResponse>;

  saveConfigObject(
    request: config_v1_resources_pb.ConfigObject,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: config_v1_resources_pb.ConfigObject) => void
  ): grpcWeb.ClientReadableStream<config_v1_resources_pb.ConfigObject>;

  updateConfigObjects(
    request: UpdateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UpdateResponse) => void
  ): grpcWeb.ClientReadableStream<UpdateResponse>;

  deleteConfigObject(
    request: config_v1_resources_pb.ConfigObject,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: DeleteResponse) => void
  ): grpcWeb.ClientReadableStream<DeleteResponse>;

  getLabelKeys(
    request: GetLabelKeysRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: LabelKeysResponse) => void
  ): grpcWeb.ClientReadableStream<LabelKeysResponse>;

}

export class ConfigPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getConfigObject(
    request: config_v1_resources_pb.ConfigRef,
    metadata?: grpcWeb.Metadata
  ): Promise<config_v1_resources_pb.ConfigObject>;

  listConfigObjects(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<config_v1_resources_pb.ConfigObject>;

  countConfigObjects(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ListCountResponse>;

  saveConfigObject(
    request: config_v1_resources_pb.ConfigObject,
    metadata?: grpcWeb.Metadata
  ): Promise<config_v1_resources_pb.ConfigObject>;

  updateConfigObjects(
    request: UpdateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<UpdateResponse>;

  deleteConfigObject(
    request: config_v1_resources_pb.ConfigObject,
    metadata?: grpcWeb.Metadata
  ): Promise<DeleteResponse>;

  getLabelKeys(
    request: GetLabelKeysRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<LabelKeysResponse>;

}

