import * as grpcWeb from 'grpc-web';

import * as commons_v1_resources_pb from '../../commons/v1/resources_pb';
import * as config_v1_resources_pb from '../../config/v1/resources_pb';
import * as frontier_v1_resources_pb from '../../frontier/v1/resources_pb';

import {
  CrawlExecutionId,
  CrawlSeedRequest,
  PageHarvest,
  PageHarvestSpec} from './frontier_pb';

export class FrontierClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  crawlSeed(
    request: CrawlSeedRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CrawlExecutionId) => void
  ): grpcWeb.ClientReadableStream<CrawlExecutionId>;

}

export class FrontierPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  crawlSeed(
    request: CrawlSeedRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CrawlExecutionId>;

}

