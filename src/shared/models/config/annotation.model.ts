import {Annotation as AnnotationProto} from '../../../api/config/v1/resources_pb';

export class Annotation {
  key: string;
  value: string;

  constructor({key = '', value = ''}: Partial<Annotation> = {}) {
    this.key = key;
    this.value = value;
  }

  static fromProto(proto: AnnotationProto) {
    return new Annotation({
      key: proto.getKey(),
      value: proto.getValue()
    });
  }

  static toProto(annotation: Annotation): AnnotationProto {
    const proto = new AnnotationProto();
    proto.setKey(annotation.key);
    proto.setValue(annotation.value);
    return proto;
  }
}
