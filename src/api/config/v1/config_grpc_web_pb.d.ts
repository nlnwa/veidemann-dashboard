import * as grpcWeb from 'grpc-web';
import {
  Timestamp,
  BrowserConfig,
  HeadersEntry,
  ScriptParametersEntry,
  BrowserScript,
  Collection,
  SubCollection,
  ConfigObject,
  ConfigRef,
  CrawlConfig,
  CrawlEntity,
  CrawlHostGroupConfig,
  IpRange,
  CrawlJob,
  CrawlLimitsConfig,
  CrawlScheduleConfig,
  CrawlScope,
  DeleteResponse,
  ExtraConfig,
  FieldMask,
  GetLabelKeysRequest,
  Label,
  LabelKeysResponse,
  ListCountResponse,
  ListRequest,
  Meta,
  PolitenessConfig,
  RoleMapping,
  Seed,
  UpdateRequest,
  UpdateResponse} from './config_pb';

export class ConfigClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getConfigObject(
    request: ConfigRef,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ConfigObject) => void
  ): grpcWeb.ClientReadableStream<ConfigObject>;

  listConfigObjects(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<ConfigObject>;

  countConfigObjects(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ListCountResponse) => void
  ): grpcWeb.ClientReadableStream<ListCountResponse>;

  saveConfigObject(
    request: ConfigObject,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ConfigObject) => void
  ): grpcWeb.ClientReadableStream<ConfigObject>;

  updateConfigObjects(
    request: UpdateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UpdateResponse) => void
  ): grpcWeb.ClientReadableStream<UpdateResponse>;

  deleteConfigObject(
    request: ConfigObject,
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
    request: ConfigRef,
    metadata?: grpcWeb.Metadata
  ): Promise<ConfigObject>;

  listConfigObjects(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<ConfigObject>;

  countConfigObjects(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ListCountResponse>;

  saveConfigObject(
    request: ConfigObject,
    metadata?: grpcWeb.Metadata
  ): Promise<ConfigObject>;

  updateConfigObjects(
    request: UpdateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<UpdateResponse>;

  deleteConfigObject(
    request: ConfigObject,
    metadata?: grpcWeb.Metadata
  ): Promise<DeleteResponse>;

  getLabelKeys(
    request: GetLabelKeysRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<LabelKeysResponse>;

}

