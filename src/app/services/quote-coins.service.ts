import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Response } from '../models/response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class QuoteCoinsService {
  private serviceURL = 'http://localhost:8080/quotes-coins-war/api/v1/';  // URL to web api

  constructor(private http: HttpClient) { }

  getRate (base: string): Observable<Response> {
    const url = `${this.serviceURL}exchange/${base}`;
    return this.http.get<Response>(url).pipe(
      tap(_ => this.log(`fetched response id=${base}`)),
      catchError(this.handleError<Response>(`getRate id=${base}`))
    );
  }

  findRate (base: string, rate: string, value: number): Observable<any> {
    const url = `${this.serviceURL}exchange/${base}/${rate}/${value}`;
    return this.http.post(url, httpOptions).pipe(
      tap(_ => this.log(`updated rate base=${base} rate=${rate} value=${value}`)),
      catchError(this.handleError<any>('findRate'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}
