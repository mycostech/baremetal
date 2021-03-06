# BareMetal Telemetry - An Angular5 Telemetry Starter backed by HarperDB

This is the repository for the Medium article [Angular 5 with HarperDB](https://medium.com/@intransitvita/baremetal-a-simple-telemetry-monitor-with-angular-5-and-harperdb-355984b6cdf2) 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.  It prototypes an Angular 5 telemetry application backed by HarperDB, a NoSQL/SQL database.

## Installing the database
Nagiviate to [harperdb.io](http://products.harperdb.io/download/beta)  and install on linux, os/x  or in the windows 10 ubuntu sub-system

## Building the schema in HarperDB
After the database is running, there are two HTTP posts to make.  You need a basic authorization header with the database username and password, and 1 additional header of 'Content-Type': 'application/json'  Steps with Postman are in the article [Angular 5 with HarperDB](https://medium.com/@intransitvita/baremetal-a-simple-telemetry-monitor-with-angular-5-and-harperdb-355984b6cdf2) 

```json
{
  "operation":"create_schema",
  "schema": "baremetal"
}
{
  "operation":"create_table",
  "schema":"baremetal",
  "table":"telemetry",
  "hash_attribute": "id"
}
```

## Add your database credentials 

For *development only* define your database user/password in the /environment/environment.ts file

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

