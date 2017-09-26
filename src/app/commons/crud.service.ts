import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {ListRequest} from './models/request.model';
import {ListReply} from './models/reply.model';

export abstract class CrudService<T extends ListRequest> {
  constructor(protected http: HttpClient,
              protected url: string) {}

  list(): Observable<ListReply<T>> {
    return this.http.get<ListReply<T>>(this.url);
  }

  get(id: string): Observable<T> {
    return this.http.get<ListReply<T>>(`${this.url}/${id}`)
      .map(reply => reply.value.length > 0 ? reply.value[0] : []);
  }

  create(item: T): Observable<T> {
    return this.http.post(this.url, item);
  }

  update(item: T): Observable<T> {
    return this.http.put(`${this.url}/${item.id}`, item);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
