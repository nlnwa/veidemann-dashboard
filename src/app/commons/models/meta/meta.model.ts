import {Label as LabelProto, Meta as MetaProto} from 'veidemann-api-grpc-web';
import {fromTimestampProto} from '../../datetime/datetime';
import {ConfigObject} from '../configobject.model';
import {Label} from './label.model';

export class Meta {
  name: string;
  description?: string;
  created?: string;
  createdBy?: string;
  lastModified?: string;
  lastModifiedBy?: string;
  labelList?: Label[];

  constructor({
                name = '',
                description = '',
                created = '',
                createdBy = '',
                lastModified = '',
                lastModifiedBy = '',
                labelList = []
              } = {}) {
    this.name = name;
    this.description = description;
    this.created = created;
    this.createdBy = createdBy;
    this.lastModified = lastModified;
    this.lastModifiedBy = lastModifiedBy;
    this.labelList = labelList;
  }

  static fromProto(proto: MetaProto): Meta {
    return new Meta({
      name: proto.getName(),
      description: proto.getDescription(),
      created: fromTimestampProto(proto.getCreated()),
      createdBy: proto.getCreatedBy(),
      lastModified: fromTimestampProto(proto.getLastModified()),
      lastModifiedBy: proto.getLastModifiedBy(),
      labelList: proto.getLabelList().map(label => new Label({key: label.getKey(), value: label.getValue()}))
    });
  }

  toProto(): MetaProto {
    const proto = new MetaProto();
    proto.setName(this.name);
    proto.setDescription(this.description);
    proto.setLabelList(this.labelList.map(label => {
      const l = new LabelProto();
      l.setKey(label.key);
      l.setValue(label.value);
      return l;
    }));

    return proto;
  }

  createUpdateRequest(updateConfig: ConfigObject, control: any, mergedConfig?: ConfigObject, addLabel?: boolean) {
    const meta = new Meta();
    const pathList = [];
    if (mergedConfig) {
      if (addLabel !== undefined) {
        if (addLabel) {
          if (mergedConfig.meta.labelList !== updateConfig.meta.labelList) {
            meta.labelList = updateConfig.meta.labelList;
            pathList.push('meta.label+');
          }
        } else {
          meta.labelList = updateConfig.meta.labelList;
          pathList.push('meta.label-');
        }
      }
    } else {
      if (addLabel !== undefined) {
        if (addLabel) {
          meta.labelList = updateConfig.meta.labelList;
          pathList.push('meta.label+');
        } else {
          meta.labelList = updateConfig.meta.labelList;
          pathList.push('meta.label-');
        }
      }
    }
    return {updateTemplate: meta, pathList: pathList};
  }
}
