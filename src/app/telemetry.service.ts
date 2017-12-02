import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { environment } from '../environments/environment';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';



@Injectable()
export class TelemetryService {

  connection: Connection;
  headers: HttpHeaders;
 
  harperOperation = {
    operation: 'describe_all'
  };

  readTelemetryOperation = {
    operation: 'describe_all'
  };

  writeTelemetryOperation = {
    operation: 'describe_all'
  };
  
  metaSchema: MetaSchema;


  constructor(private http: HttpClient) {
    //for development environment only, in production your users would be providing credentials
    this.connection = environment.connection;
  }

  public getHarperSchemas(): Observable<Schema[]> {

    const headers = this.getHeaders();
    let metaSchemaBack: MetaSchema = new MetaSchema();
    let schemas: Array<Schema> = new Array();

    return this.http.post<Schema[]>(this.connection.server, this.harperOperation, { headers }).pipe(
      tap(schemas => console.log("Tapped: " + JSON.stringify(schemas)),
      catchError(this.handleError('getMetaSchema', []))
      ));
  }

    // return this.http.post<MetaSchema>(this.connection.server, this.harperOperation, { headers }).subscribe(
    //   data => {
    //     // console.log('data party down under: ' + data);
    //     // console.log(JSON.stringify(data));
        
    //     this.metaSchema = data
    //     console.log(JSON.stringify(data));
    //     this.metaSchema[0];

    //     console.log(JSON.stringify(data));
    //     console.log(JSON.stringify(this.metaSchema));

    //     this.metaSchema.schemas.forEach(schema => {
    //       console.log('HarperDB contains schema: ' + schema);
    //       schema.tables.forEach(table => {
    //         console.log('HarperDB schema  contains table: ' + table.name);
    //       })
    //     });
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       // A client-side or network error occurred. Handle it accordingly.
    //       console.log('An error occurred:', err.error.message);
    //     } else {
    //       // The backend returned an unsuccessful response code.
    //       // The response body may contain clues as to what went wrong
    //       console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    //     }
    //   }
    // );
  

  public readTelemetry() {
    
     console.log("config dump... " + this.connection);

    const headers = this.getHeaders();

    this.http.post<MetaSchema[]>(this.connection.server, this.harperOperation, { headers }).subscribe(
      data => {
        console.log('data party down under: ' + data);
        console.log(JSON.stringify(data));

        for (let x in data) {
          console.log(x);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  public writeTelemetry() {
    
     console.log("config dump... " + this.connection);

    const headers = this.getHeaders();

    this.http.post<Schema[]>(this.connection.server, this.harperOperation, { headers }).subscribe(
      data => {
        console.log('data party down under: ' + data);
        console.log(JSON.stringify(data));

        for (let x in data) {
          console.log(x);
        }

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  private getHeaders(): HttpHeaders {
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
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export interface Connection {
  server: string,
  username: string,
  password: string
}

//Root return object from describe_all 
export class MetaSchema {
  public schemas: Schema[]
}

export class Schema {
  name: string
  tables: Table[]
}

export class Table {
  hash_attribute: string
  id: string
  schema: string
  name: string
  atrributes: Attributes
}

interface Attributes {
  entries<T extends { [key: string]: any }, K extends keyof T>(o: T): [keyof T, T[K]][]; 
}







