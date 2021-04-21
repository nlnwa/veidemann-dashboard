import {Resource} from './resource.model';
import {PageLogProto} from '../../../api';
import {ApiError} from '../commons/api-error.model';

export class PageLog {
  id: string;
  warcId: string;
  uri: string;
  executionId: string;
  referrer: string;
  jobExecutionId: string;
  collectionFinalName: string;
  method: string;
  resource: Resource[];
  outlink: string[];

  constructor({
                id = '',
                warcId = '',
                uri = '',
                executionId = '',
                referrer = '',
                jobExecutionId = '',
                collectionFinalName = '',
                method = '',
                resource = [],
                outlink = [],
              }: Partial<PageLog> = {}) {
    this.id = id || warcId;
    this.warcId = warcId;
    this.uri = uri;
    this.executionId = executionId;
    this.referrer = referrer;
    this.jobExecutionId = jobExecutionId;
    this.collectionFinalName = collectionFinalName;
    this.method = method;
    this.resource = resource ? resource.map(_ => new Resource(_)) : [];
    this.outlink = outlink;
  }

  /**
   * A function that transforms the results. This function is called for each member of the object.
   * If a member contains nested objects, the nested objects are transformed before the parent object is.
   * @see JSON.parse
   */
  static reviver(key: string, value: any) {
    switch (key) {
      default:
        return value;
    }
  }

  static fromProto(proto: PageLogProto): PageLog {
    return new PageLog({
      warcId: proto.getWarcId(),
      uri: proto.getUri(),
      executionId: proto.getExecutionId(),
      referrer: proto.getReferrer(),
      jobExecutionId: proto.getJobExecutionId(),
      collectionFinalName: proto.getCollectionFinalName(),
      method: proto.getMethod(),
      resource: proto.getResourceList().map(resourceProto => new Resource({
        uri: resourceProto.getUri(),
        fromCache: resourceProto.getFromCache(),
        renderable: resourceProto.getRenderable(),
        resourceType: resourceProto.getResourceType(),
        mimeType: resourceProto.getContentType(),
        statusCode: resourceProto.getStatusCode(),
        discoveryPath: resourceProto.getDiscoveryPath(),
        warcId: resourceProto.getWarcId(),
        referrer: resourceProto.getReferrer(),
        error: ApiError.fromProto(resourceProto.getError()),
        method: resourceProto.getMethod()
      })),
      outlink: proto.getOutlinkList()
    });
  }

  static toProto(pageLog: PageLog): PageLogProto {
    const proto = new PageLogProto();
    proto.setWarcId(pageLog.warcId);
    proto.setUri(pageLog.uri);
    proto.setExecutionId(pageLog.executionId);
    proto.setReferrer(pageLog.referrer);
    proto.setJobExecutionId(pageLog.jobExecutionId);
    proto.setCollectionFinalName(pageLog.collectionFinalName);
    proto.setMethod(pageLog.method);
    proto.setResourceList(pageLog.resource.map(resource => Resource.toProto(resource)));
    proto.setOutlinkList(pageLog.outlink);
    return proto;
  }
}
