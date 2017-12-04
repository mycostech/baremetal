import { Component } from '@angular/core';
import { TelemetryService } from './services/telemetry.service';
import { Schema, HarperOperation, TelemetryEvent, TelemetryData, Record } from './models/harper.models';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  ]
})
export class AppComponent {

  schemas: Schema[] = [];

  rows = [];

  columns = [
    { prop: 'id' },
    { name: 'Description' },
    { name: 'Event' },
    { name: 'Time' }
  ];

  title = 'BareMetal Telemetry with HarperDB and Angular 5';

  constructor(private telemetryService: TelemetryService) { }

  ngOnInit() {
    // this.getSchema();
  }


  onReadTelemetry()   {
    this.telemetryService.readTelemetry()
      .subscribe(result => {
        this.rows = result;
      });
  }

  onWriteTelemetry(){
    this.telemetryService.writeTelemetry(this.generateFakeTelemetryEvent())
      .subscribe(result => {
        console.log(result);
        this.onReadTelemetry();
      });
  }


  getSchema(): void {
    this.telemetryService.getHarperSchemas()
      .subscribe(schemas => {
        this.schemas = schemas;
        const schemaKeys: string[] = Object.keys(this.schemas);

        schemaKeys.forEach(element => {
          let individualSchema = this.schemas[element];
          console.log("Schema for " + element + " is: " + JSON.stringify(individualSchema));
          let mappedSchema: Schema = new Schema();
          mappedSchema.name = element;
          mappedSchema.tables = individualSchema;
        });
      });
  };


  generateFakeTelemetryEvent(): TelemetryEvent {

    const telemetryOp: TelemetryEvent = new TelemetryEvent();
    const rec: Record = new Record();

    rec.id = Guid.newGuid();
    rec.description = 'Something bad happened in the app';
    rec.time = new Date().toUTCString();
    rec.event = this.randomEvent();

    telemetryOp.records.push(rec);

    return telemetryOp;
  }


  randomEvent(): string {
    const eventTypes = ['crash', 'warning', 'i/o bottleneck', 'unknown'];
    return eventTypes[Math.floor(Math.random() * eventTypes.length)];
  }

}

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
