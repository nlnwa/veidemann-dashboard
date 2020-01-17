import {ErrorProto} from '../../../api';

export class ApiError {
  code: number;
  msg: string;
  detail: string;

  constructor({
                code = 0,
                msg = '',
                detail = ''
              }: Partial<ApiError> = {}) {
    this.code = code;
    this.msg = msg;
    this.detail = detail;
  }

  static fromProto(proto: ErrorProto): ApiError {
    if (!proto) {
      return null;
    }
    return new ApiError({
      code: proto.getCode(),
      msg: proto.getMsg(),
      detail: proto.getDetail()
    });
  }
}
