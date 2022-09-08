import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    protected httpClient: HttpClient,
    @Inject('BASE_URL') public baseUrl
  ) {}

  httpOptions = {
    headers: new HttpHeaders({}),
  };

  getBaseUrl() {
    return this.baseUrl;
  }

  post(uri: string, data): Observable<any> {
    return this.httpClient
      .post(this.getBaseUrl() + uri, data, this.httpOptions)
      .pipe(catchError((err) => this.handleError(err)));
  }

  private handleError(err) {
    return observableThrowError(err);
  }
}
