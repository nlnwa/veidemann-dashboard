import * as jspb from "google-protobuf"

import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as config_v1_resources_pb from '../../config/v1/resources_pb';
import * as frontier_v1_resources_pb from '../../frontier/v1/resources_pb';

export class CrawlSeedRequest extends jspb.Message {
  getJobExecutionId(): string;
  setJobExecutionId(value: string): void;

  getJob(): config_v1_resources_pb.ConfigObject | undefined;
  setJob(value?: config_v1_resources_pb.ConfigObject): void;
  hasJob(): boolean;
  clearJob(): void;

  getSeed(): config_v1_resources_pb.ConfigObject | undefined;
  setSeed(value?: config_v1_resources_pb.ConfigObject): void;
  hasSeed(): boolean;
  clearSeed(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlSeedRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlSeedRequest): CrawlSeedRequest.AsObject;
  static serializeBinaryToWriter(message: CrawlSeedRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlSeedRequest;
  static deserializeBinaryFromReader(message: CrawlSeedRequest, reader: jspb.BinaryReader): CrawlSeedRequest;
}

export namespace CrawlSeedRequest {
  export type AsObject = {
    jobExecutionId: string,
    job?: config_v1_resources_pb.ConfigObject.AsObject,
    seed?: config_v1_resources_pb.ConfigObject.AsObject,
  }
}

export class CrawlExecutionId extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CrawlExecutionId.AsObject;
  static toObject(includeInstance: boolean, msg: CrawlExecutionId): CrawlExecutionId.AsObject;
  static serializeBinaryToWriter(message: CrawlExecutionId, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CrawlExecutionId;
  static deserializeBinaryFromReader(message: CrawlExecutionId, reader: jspb.BinaryReader): CrawlExecutionId;
}

export namespace CrawlExecutionId {
  export type AsObject = {
    id: string,
  }
}

export class PageHarvest extends jspb.Message {
  getRequestnextpage(): boolean;
  setRequestnextpage(value: boolean): void;

  getMetrics(): PageHarvest.Metrics | undefined;
  setMetrics(value?: PageHarvest.Metrics): void;
  hasMetrics(): boolean;
  clearMetrics(): void;

  getOutlink(): frontier_v1_resources_pb.QueuedUri | undefined;
  setOutlink(value?: frontier_v1_resources_pb.QueuedUri): void;
  hasOutlink(): boolean;
  clearOutlink(): void;

  getError(): commons_v1_resources_pb.Error | undefined;
  setError(value?: commons_v1_resources_pb.Error): void;
  hasError(): boolean;
  clearError(): void;

  getMsgCase(): PageHarvest.MsgCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PageHarvest.AsObject;
  static toObject(includeInstance: boolean, msg: PageHarvest): PageHarvest.AsObject;
  static serializeBinaryToWriter(message: PageHarvest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PageHarvest;
  static deserializeBinaryFromReader(message: PageHarvest, reader: jspb.BinaryReader): PageHarvest;
}

export namespace PageHarvest {
  export type AsObject = {
    requestnextpage: boolean,
    metrics?: PageHarvest.Metrics.AsObject,
    outlink?: frontier_v1_resources_pb.QueuedUri.AsObject,
    error?: commons_v1_resources_pb.Error.AsObject,
  }

  export class Metrics extends jspb.Message {
    getUriCount(): number;
    setUriCount(value: number): void;

    getBytesDownloaded(): number;
    setBytesDownloaded(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Metrics.AsObject;
    static toObject(includeInstance: boolean, msg: Metrics): Metrics.AsObject;
    static serializeBinaryToWriter(message: Metrics, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Metrics;
    static deserializeBinaryFromReader(message: Metrics, reader: jspb.BinaryReader): Metrics;
  }

  export namespace Metrics {
    export type AsObject = {
      uriCount: number,
      bytesDownloaded: number,
    }
  }


  export enum MsgCase { 
    MSG_NOT_SET = 0,
    REQUESTNEXTPAGE = 1,
    METRICS = 2,
    OUTLINK = 3,
    ERROR = 4,
  }
}

export class PageHarvestSpec extends jspb.Message {
  getQueuedUri(): frontier_v1_resources_pb.QueuedUri | undefined;
  setQueuedUri(value?: frontier_v1_resources_pb.QueuedUri): void;
  hasQueuedUri(): boolean;
  clearQueuedUri(): void;

  getCrawlConfig(): config_v1_resources_pb.ConfigObject | undefined;
  setCrawlConfig(value?: config_v1_resources_pb.ConfigObject): void;
  hasCrawlConfig(): boolean;
  clearCrawlConfig(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PageHarvestSpec.AsObject;
  static toObject(includeInstance: boolean, msg: PageHarvestSpec): PageHarvestSpec.AsObject;
  static serializeBinaryToWriter(message: PageHarvestSpec, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PageHarvestSpec;
  static deserializeBinaryFromReader(message: PageHarvestSpec, reader: jspb.BinaryReader): PageHarvestSpec;
}

export namespace PageHarvestSpec {
  export type AsObject = {
    queuedUri?: frontier_v1_resources_pb.QueuedUri.AsObject,
    crawlConfig?: config_v1_resources_pb.ConfigObject.AsObject,
  }
}

