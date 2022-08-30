import {ClientReadableStream, Metadata, Request, StreamInterceptor} from 'grpc-web';

export class MetadataInterceptor implements StreamInterceptor<any, any> {
  private readonly metadata: Metadata;

  constructor(metadata: Metadata) {
    this.metadata = metadata;
  }

  intercept(request: Request<any, any>, invoker: (request: Request<any, any>) => ClientReadableStream<any>): ClientReadableStream<any> {
    Object.assign(request.getMetadata(), this.metadata);
    return invoker(request);
  }
}
