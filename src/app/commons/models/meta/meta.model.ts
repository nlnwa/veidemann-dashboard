import {Label as LabelProto, Meta as MetaProto} from '../../../../api/config/v1/config_pb';
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
      labelList: proto.getLabelList()
    });
  }

  toProto(): MetaProto {
    const proto = new MetaProto() as any as MetaProto.AsObject;
    proto.name = this.name;
    proto.description = this.description;
    proto.labelList = this.labelList.map(label => {
      const l = new LabelProto();
      l.setKey(label.key);
      l.setValue(label.value);
      return l;
    });

    return proto as any as MetaProto;
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
