export interface Connection {
  server: string;
  username: string;
  password: string;
}

// A few schema related objects
export class MetaSchema {
  public schemas: Schema[];
}

export class Schema {
  name: string;
  tables: Table[];
}

export class Table {
  hash_attribute: string;
  id: string | number;
  schema: string;
  name: string;
  attributes: Attributes[];
}

class Attributes {
  [key: string]: string | number | Date;
}

export class TelemetryData extends Attributes { }

// Operations

export class HarperResponse {
  message: string;
}

export class HarperOperation {
  protected schema = "baremetal";
  protected table = "telemetry";
}

export class TelemetryEvent extends HarperOperation {
  private operation = "insert";
  records: Record[] = [];

  constructor() {
    super();
  }
}

export class Record {
  id: string;
  event: string;
  description: string;
  time: string;
}

export const DescribeAll = {
  operation: 'describe_all'
};

export const readTelemetryOperation = {
  operation: 'sql',
  sql: 'select * from baremetal.telemetry'
};










