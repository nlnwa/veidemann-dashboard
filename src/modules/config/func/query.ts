import {Kind} from '../../../shared/models';
import {ListRequest} from '../../../api';


export function createListRequest(kind: Kind) {
  const listRequest = new ListRequest();
  listRequest.setKind(kind.valueOf());
  return listRequest;
}
