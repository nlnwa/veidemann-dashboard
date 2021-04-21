import {ApiError} from '../commons/api-error.model';
import {PageLogProto} from '../../../api';

export class Resource {
  uri: string;
  fromCache: boolean;
  renderable: boolean;
  resourceType: string;
  mimeType: string;
  statusCode: number;
  discoveryPath: string;
  warcId: string;
  referrer: string;
  error: ApiError;
  method: string;

  constructor({
                uri = '',
                fromCache = false,
                renderable = false,
                resourceType = '',
                mimeType = '',
                statusCode = 0,
                discoveryPath = '',
                warcId = '',
                referrer = '',
                error = new ApiError(),
                method = ''
              }: Partial<Resource> = {}) {
    this.uri = uri;
    this.fromCache = fromCache;
    this.renderable = renderable;
    this.resourceType = resourceType;
    this.mimeType = mimeType;
    this.statusCode = statusCode;
    this.discoveryPath = discoveryPath;
    this.warcId = warcId;
    this.referrer = referrer;
    this.error = error;
    this.method = method;
  }

  static fromProto(proto: PageLogProto.Resource): Resource {
    return new Resource({
      uri: proto.getUri(),
      fromCache: proto.getFromCache(),
      renderable: proto.getRenderable(),
      resourceType: proto.getResourceType(),
      mimeType: proto.getContentType(),
      statusCode: proto.getStatusCode(),
      discoveryPath: proto.getDiscoveryPath(),
      warcId: proto.getWarcId(),
      referrer: proto.getReferrer(),
      error: ApiError.fromProto(proto.getError()),
      method: proto.getMethod()
    });
  }

  static toProto(resource: Resource): PageLogProto.Resource {
    const proto = new PageLogProto.Resource();
    proto.setUri(resource.uri);
    proto.setFromCache(resource.fromCache);
    proto.setRenderable(resource.renderable);
    proto.setResourceType(resource.resourceType);
    proto.setContentType(resource.mimeType);
    proto.setStatusCode(resource.statusCode);
    proto.setDiscoveryPath(resource.discoveryPath);
    proto.setWarcId(resource.warcId);
    proto.setReferrer(resource.referrer);
    proto.setMethod(resource.method);
    return proto;
  }
}

