import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ListReply, ListRequest} from '../../commons/models/controller.model';

function requestToParams(listRequest: ListRequest): HttpParams {
  return Object.keys(listRequest).reduce((acc, key) => acc.append(key, listRequest[key]), new HttpParams);
}

export abstract class CrudService<T extends ListRequest> {

  protected readonly url: string;

  constructor(protected http: HttpClient) {}

  list(): Observable<ListReply<T>> {
    return this.http.get<ListReply<T>>(this.url);
  }

  search(listRequest: ListRequest): Observable<ListReply<T>> {
    const params = requestToParams(listRequest);
    return this.http.get<ListReply<T>>(this.url, {params});
  }

  get(id: string): Observable<T> {
    return id ? this.http.get<T>(`${this.url}/${id}`) : throwError('parameter id is falsy');
  }

  create(item: T): Observable<T> {
    return item ? this.http.put<T>(this.url, item) : throwError('parameter item is falsy');
  }

  update(item: T): Observable<T> {
    return item ? this.http.post<T>(`${this.url}/${item.id}`, item) : throwError('parameter item is falsy');
  }

  // noinspection ReservedWordAsName
  delete(id: string): Observable<any> {
    return id ? this.http.delete<any>(`${this.url}/${id}`) : throwError('parameter id is falsy');
  }

}
