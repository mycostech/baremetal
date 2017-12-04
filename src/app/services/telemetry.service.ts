import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import {
  Connection, MetaSchema, Schema, TelemetryData, HarperOperation,
  Record, DescribeAll, readTelemetryOperation, TelemetryEvent, HarperResponse
} from '../models/harper.models';

@Injectable()
export class TelemetryService {

  connection: Connection;
  headers: HttpHeaders;

  telemetryData: TelemetryData;

  constructor(private http: HttpClient) {
    // for development environment only - in production your users would typically be providing credentials
    this.connection = environment.connection;
    this.headers = this.buildHeaders();
  }

  public getHarperSchemas(): Observable<Schema[]> {
    return this.http.post<Schema[]>(this.connection.server, DescribeAll, { headers: this.headers }).pipe(
      tap(schemas =>  // console.log("Get Schema Returned: " + JSON.stringify(schemas)),
        catchError(this.handleError('getMetaSchema', []))
      ));
  }

  /**
  * BareMetal's Primary Service Method
  */
  readTelemetry(): Observable<Record[]> {
    return this.http.post<Record[]>(this.connection.server, readTelemetryOperation, { headers: this.headers }).pipe(tap(telemetryRows =>
      this.log(` Returned "${(telemetryRows.length)}" records from HarperDB `)),
      catchError(this.handleError('readTelemetry', []))
    );
  }

  /**
   *
   * Send some test telemetry data to HarperDB
   */
  writeTelemetry(telemetryEvent: TelemetryEvent): Observable<HarperResponse> {
    return this.http.post<HarperResponse>(this.connection.server, telemetryEvent, { headers: this.headers }).pipe(
      tap((response: HarperResponse) => this.log(` "${(response.message)}" in HarperDB `)),
      catchError(this.handleError<HarperResponse>('writeTelemetry'))
    );
  }

  /**
  * Build the HTTP Headers required for HarperDB
  * TODO: append headers via HttpInterceptor, e.g. AuthInterceptor implements HttpInterceptor
  */
  private buildHeaders(): HttpHeaders {

    let headers: HttpHeaders;

    if (!this.headers) {
      const encodedAutHeaderValue = btoa(this.connection.username + ':' + this.connection.password);
      headers = new HttpHeaders({ 'Authorization': 'Basic ' + encodedAutHeaderValue, 'Content-Type': 'application/json' });
    }
    return headers;
  }

  /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('Telemetry Service: ' + message);
  }
}








