import {Annotation as AnnotationProto, Label as LabelProto, Meta as MetaProto} from '../../../api/config/v1/resources_pb';

import {unmarshalTimestamp} from '../../func';
import {Label} from './label.model';
import {Annotation} from './annotation.model';

export class Meta {
  name: string;
  description: string;
  created: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  labelList: Label[];
  annotationList: Annotation[];

  constructor({
                labelList = [],
                annotationList = [],
                description = '',
                name = '',
                created = '',
                createdBy = '',
                lastModified = '',
                lastModifiedBy = '',
              }: Partial<Meta> = {}) {
    this.name = name;
    this.description = description;
    this.created = created;
    this.createdBy = createdBy;
    this.lastModified = lastModified;
    this.lastModifiedBy = lastModifiedBy;
    this.labelList = labelList ? labelList.map(label => new Label(label)) : [];
    this.annotationList = annotationList ? annotationList.map(annotation => new Annotation(annotation)) : [];
  }

  static fromProto(proto: MetaProto): Meta {
    return new Meta({
      name: proto.getName(),
      description: proto.getDescription(),
      created: unmarshalTimestamp(proto.getCreated()),
      createdBy: proto.getCreatedBy(),
      lastModified: unmarshalTimestamp(proto.getLastModified()),
      lastModifiedBy: proto.getLastModifiedBy(),
      labelList: proto.getLabelList().map(label => new Label({key: label.getKey(), value: label.getValue()})),
      annotationList: proto.getAnnotationList().map(annotation => new Annotation({key: annotation.getKey(), value: annotation.getValue()}))
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
    proto.setAnnotationList(meta.annotationList.map(annotation => {
      const a = new AnnotationProto();
      a.setKey(annotation.key);
      a.setValue(annotation.value);
      return a;
    }));

    return proto;
  }
}
