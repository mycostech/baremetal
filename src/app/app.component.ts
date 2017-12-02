import { Component } from '@angular/core';
import { TelemetryService } from './telemetry.service';
import { Schema } from './telemetry.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  schemas: Schema[] = [];
  title = 'Hello HarperDB';

  constructor(private telemetryService: TelemetryService) { }

  ngOnInit() {
    this.getSchema();

    console.log(JSON.stringify(this.schemas));

    this.schemas.forEach(element => {
      console.log(JSON.stringify(element));
    });
  }

  getSchema(): void {
    this.telemetryService.getHarperSchemas()
      .subscribe(schemas => {
        this.schemas = schemas;
        let schemaKeys: string[] = Object.keys(this.schemas);

        schemaKeys.forEach(element => {
          let individualSchema = this.schemas[element];
          console.log("Schema for " + element + " is: " + JSON.stringify(individualSchema));
          let mappedSchema: Schema = new Schema();
          mappedSchema.name = element;
          mappedSchema.tables = individualSchema
        });
      });
  }
}
