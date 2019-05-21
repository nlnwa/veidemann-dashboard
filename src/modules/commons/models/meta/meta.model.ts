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

  constructor({
                labelList,
                description = '',
                name = ''
              }: Partial<Meta> = {}) {
    this.name = name;
    this.description = description;
    this.created = '';
    this.createdBy = '';
    this.lastModified = '';
    this.lastModifiedBy = '';
    this.labelList = labelList ? labelList.map(label => new Label(label)) : [];
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
