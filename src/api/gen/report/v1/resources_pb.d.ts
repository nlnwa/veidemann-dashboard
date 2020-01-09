import * as jspb from "google-protobuf"

import * as frontier_v1_resources_pb from '../../frontier/v1/resources_pb';
import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class StatusDetail extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getState(): frontier_v1_resources_pb.CrawlExecutionStatus.State;
  setState(value: frontier_v1_resources_pb.CrawlExecutionStatus.State): void;

  getJobid(): string;
  setJobid(value: string): void;

  getSeed(): string;
  setSeed(value: string): void;

  getStartTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartTime(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasStartTime(): boolean;
  clearStartTime(): void;

  getEndTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setEndTime(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasEndTime(): boolean;
  clearEndTime(): void;

  getDocumentsCrawled(): number;
  setDocumentsCrawled(value: number): void;

  getBytesCrawled(): number;
  setBytesCrawled(value: number): void;

  getUrisCrawled(): number;
  setUrisCrawled(value: number): void;

  getDocumentsFailed(): number;
  setDocumentsFailed(value: number): void;

  getDocumentsOutOfScope(): number;
  setDocumentsOutOfScope(value: number): void;

  getDocumentsRetried(): number;
  setDocumentsRetried(value: number): void;

  getDocumentsDenied(): number;
  setDocumentsDenied(value: number): void;

  getQueueSize(): number;
  setQueueSize(value: number): void;

  getCurrentUri(): string;
  setCurrentUri(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusDetail.AsObject;
  static toObject(includeInstance: boolean, msg: StatusDetail): StatusDetail.AsObject;
  static serializeBinaryToWriter(message: StatusDetail, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusDetail;
  static deserializeBinaryFromReader(message: StatusDetail, reader: jspb.BinaryReader): StatusDetail;
}

export namespace StatusDetail {
  export type AsObject = {
    id: string,
    state: frontier_v1_resources_pb.CrawlExecutionStatus.State,
    jobid: string,
    seed: string,
    startTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    endTime?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    documentsCrawled: number,
    bytesCrawled: number,
    urisCrawled: number,
    documentsFailed: number,
    documentsOutOfScope: number,
    documentsRetried: number,
    documentsDenied: number,
    queueSize: number,
    currentUri: string,
  }
}

