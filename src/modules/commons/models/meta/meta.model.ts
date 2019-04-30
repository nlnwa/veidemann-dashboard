import {LabelProto, MetaProto} from '../../../../api';
import {fromTimestampProto} from '../../func/datetime/datetime';
import {ConfigObject} from '../configobject.model';
import {Label} from './label.model';

export class Meta {
  name: string;
  description: string;
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  labelList: Label[];

  constructor(meta?: Partial<Meta>) {
    if (meta) {
      this.name = meta.name || '';
      this.description = meta.description || '';
      this.created = meta.created || '';
      this.createdBy = meta.createdBy || '';
      this.lastModified = meta.lastModified || '';
      this.lastModifiedBy = meta.lastModifiedBy || '';
      this.labelList = meta.labelList ? meta.labelList.map(label => new Label(label)) : [];
    }
  }

  static createUpdateRequest(updateTemplate: ConfigObject,
                             pathList: string[],
                             updateConfig: ConfigObject,
                             mergedConfig: ConfigObject,
                             options: any): void {
    const meta = new Meta();
    updateTemplate.meta = meta;

    const {addLabel} = options;

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

  static toProto(meta: Meta): MetaProto {
    console.log('toProto meta: ', meta);
    const proto = new MetaProto();
    proto.setName(meta.name);
    proto.setDescription(meta.description);
    proto.setLabelList(meta.labelList.map(label => {
      const l = new LabelProto();
      l.setKey(label.key);
      l.setValue(label.value);
      return l;
    }));

    return proto;
  }
}
