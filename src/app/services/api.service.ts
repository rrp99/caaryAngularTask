import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    protected httpClient: HttpClient,
    @Inject('BASE_URL') public baseUrl: any
  ) {}

  httpOptions = {
    headers: new HttpHeaders({}),
  };

  /**
   * Get Base Url
   * @param uri string
   */
  getBaseUrl(): any {
    return this.baseUrl;
  }

  /**
   * POST request
   */
  post(uri: string, data: any): Observable<any> {
    // this.httpOptions.headers.append('oauth-token', '');
    return this.httpClient
      .post(this.getBaseUrl() + uri, data, this.httpOptions)
      .pipe(catchError((err) => this.handleError(err)));
  }

  /**
   * Handle general errors from the API
   *
   * @param err
   * @returns {ErrorObservable}
   */
  private handleError(err: any) {
    return observableThrowError(err);
  }
}
