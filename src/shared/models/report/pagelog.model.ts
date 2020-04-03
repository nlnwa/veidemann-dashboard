import {Resource} from './resource.model';
import {PageLogProto} from '../../../api';
import {ApiError} from './api-error.model';

export class PageLog {
  id: string;
  warcId: string;
  uri: string;
  executionId: string;
  referrer: string;
  jobExecutionId: string;
  collectionFinalName: string;
  method: string;
  resourceList: Resource[];
  outlinkList: Array<string>;

  constructor({
                id = '',
                warcId = '',
                uri = '',
                executionId = '',
                referrer = '',
                jobExecutionId = '',
                collectionFinalName = '',
                method = '',
                resourceList = [],
                outlinkList = []
              }: Partial<PageLog> = {}) {
    this.id = id;
    this.warcId = warcId;
    this.uri = uri;
    this.executionId = executionId;
    this.referrer = referrer;
    this.jobExecutionId = jobExecutionId;
    this.collectionFinalName = collectionFinalName;
    this.method = method;
    this.resourceList = resourceList ? resourceList.map(resouce => new Resource(resouce)) : [];
    this.outlinkList = outlinkList;
  }

  static fromProto(proto: PageLogProto): PageLog {
    return new PageLog({
      id: proto.getWarcId(),
      warcId: proto.getWarcId(),
      uri: proto.getUri(),
      executionId: proto.getExecutionId(),
      referrer: proto.getReferrer(),
      jobExecutionId: proto.getJobExecutionId(),
      collectionFinalName: proto.getCollectionFinalName(),
      method: proto.getMethod(),
      resourceList: proto.getResourceList().map(resourceProto => new Resource({
        uri: resourceProto.getUri(),
        fromCache: resourceProto.getFromCache(),
        renderable: resourceProto.getRenderable(),
        resourceType: resourceProto.getResourceType(),
        mimeType: resourceProto.getMimeType(),
        statusCode: resourceProto.getStatusCode(),
        discoveryPath: resourceProto.getDiscoveryPath(),
        warcId: resourceProto.getWarcId(),
        referrer: resourceProto.getReferrer(),
        error: ApiError.fromProto(resourceProto.getError()),
        method: resourceProto.getMethod()
      })),
      outlinkList: proto.getOutlinkList()
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
    proto.setResourceList(pageLog.resourceList.map(resource => Resource.toProto(resource)));
    proto.setOutlinkList(pageLog.outlinkList);
    return proto;
  }
}
