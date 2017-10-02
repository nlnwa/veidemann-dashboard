import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ListReply, ListRequest} from './models/controller.model';

export abstract class CrudService<T extends ListRequest> {
  constructor(protected http: HttpClient,
              protected url: string) {}

  list(): Observable<ListReply<T>> {
    return this.http.get<ListReply<T>>(this.url);
  }

  search(listRequest: ListRequest): Observable<ListReply<T>> {
    let params = new HttpParams()
    Object.keys(listRequest).forEach(key => {
      params = params.append(key, listRequest[key]);
    });
    return this.http.get<ListReply<T>>(this.url, {params});
  }

  get(id: string): Observable<T> {
    return this.http.get<ListReply<T>>(`${this.url}/${id}`)
      .map(reply => reply.value.length > 0 ? reply.value[0] : null);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.url, item);
  }

  update(item: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${item.id}`, item);
  }

  // noinspection ReservedWordAsName
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
      .catch((err) => {
        return Observable.of(err as HttpErrorResponse);
      });
  }
}