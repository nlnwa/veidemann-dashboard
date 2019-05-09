import * as grpcWeb from 'grpc-web';

import * as eventhandler_v1_resources_pb from '../../eventhandler/v1/resources_pb';
import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as google_api_annotations_pb from '../../google/api/annotations_pb';
import * as protoc$gen$swagger_options_annotations_pb from '../../protoc-gen-swagger/options/annotations_pb';

import {
  DeleteResponse,
  ListCountResponse,
  ListLabelRequest,
  ListLabelResponse,
  ListRequest,
  SaveRequest,
  UpdateRequest,
  UpdateResponse} from './eventhandler_pb';

export class EventHandlerClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getEventObject(
    request: eventhandler_v1_resources_pb.EventRef,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: eventhandler_v1_resources_pb.EventObject) => void
  ): grpcWeb.ClientReadableStream<eventhandler_v1_resources_pb.EventObject>;

  listEventObjects(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<eventhandler_v1_resources_pb.EventObject>;

  countEventObjects(
    request: ListRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ListCountResponse) => void
  ): grpcWeb.ClientReadableStream<ListCountResponse>;

  saveEventObject(
    request: SaveRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: eventhandler_v1_resources_pb.EventObject) => void
  ): grpcWeb.ClientReadableStream<eventhandler_v1_resources_pb.EventObject>;

  updateEventObjects(
    request: UpdateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UpdateResponse) => void
  ): grpcWeb.ClientReadableStream<UpdateResponse>;

  deleteEventObject(
    request: eventhandler_v1_resources_pb.EventObject,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: DeleteResponse) => void
  ): grpcWeb.ClientReadableStream<DeleteResponse>;

  listLabels(
    request: ListLabelRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ListLabelResponse) => void
  ): grpcWeb.ClientReadableStream<ListLabelResponse>;

}

export class EventHandlerPromiseClient {
  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; });

  getEventObject(
    request: eventhandler_v1_resources_pb.EventRef,
    metadata?: grpcWeb.Metadata
  ): Promise<eventhandler_v1_resources_pb.EventObject>;

  listEventObjects(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<eventhandler_v1_resources_pb.EventObject>;

  countEventObjects(
    request: ListRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ListCountResponse>;

  saveEventObject(
    request: SaveRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<eventhandler_v1_resources_pb.EventObject>;

  updateEventObjects(
    request: UpdateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<UpdateResponse>;

  deleteEventObject(
    request: eventhandler_v1_resources_pb.EventObject,
    metadata?: grpcWeb.Metadata
  ): Promise<DeleteResponse>;

  listLabels(
    request: ListLabelRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ListLabelResponse>;

}

