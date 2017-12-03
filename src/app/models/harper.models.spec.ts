import { TestBed } from '@angular/core/testing';
import { MetaSchema, Schema, Table } from './harper.models';

const schemaJson = {
    "baremetal": {
        "stats": {
            "id": "d602df83-6c71-43e0-a17f-ff8889ce868f",
            "name": "stats",
            "hash_attribute": "id",
            "schema": "baremetal",
            "attributes": []
        },
        "telemetry": {
            "id": "b72f2e4c-704f-47db-ae95-a3b6db468789",
            "name": "telemetry",
            "schema": "baremetal",
            "hash_attribute": "id",
            "attributes": [
                {
                    "attribute": "id"
                },
                {
                    "attribute": "time"
                },
                {
                    "attribute": "event"
                },
                {
                    "attribute": "description"
                }
            ]
        }
    },
    "stats": {} //
};


const tableData =
    [
        {
            "id": 1,
            "description": "module x errored",
            "time": "12:21:02:01",
            "event": "app_crash"
        },
        {
            "id": 2,
            "description": "module y errored",
            "time": "12:21:02:09",
            "event": "app_crash"
        }
    ];


describe('HarperDB Models', () => {
    it('should create the table', () => {
        const table = new Table();
        expect(table).toBeTruthy();
    });
    it('should read the schema', () => {
        const schema = schemaJson;
        expect(schema).toBeTruthy();
    });
    it('should have two schemas', () => {
        const schema = schemaJson;
        let schemaKeys: string[] = Object.keys(schema);
        expect(schemaKeys.length).toEqual(2);
    });
    it('should have a stats schema at index 1', () => {
        const schema = schemaJson;
        let schemaKeys: string[] = Object.keys(schema);
        expect(schemaKeys.indexOf("stats")).toEqual(1);
    });
    it('should have a table named telemetry', () => {
        const schema = schemaJson;
        let schemaKeys: string[] = Object.keys(schema);
        const schemas = schemaKeys.map(schemaValue =>  Object.keys(schema[schemaValue]));

        //From all the schemas - pull the schema that includes the table telemetry
        let result = schemas.find(x => x.includes("telemetry"));

        expect(result.includes("telemetry"));
        });
    });
    it('should have a table that maps to the HarperDB table type - compile time type check', () => {
        const schema = schemaJson;
        let telemetryTable: Table = schema["baremetal"]["telemetry"];
        expect(telemetryTable.name).toEqual("telemetry");      
    });
    it('should have 4 attributes', () => {
        const schema = schemaJson;
        let telemetryTable: Table = schema["baremetal"]["telemetry"];
        expect(telemetryTable.attributes.length).toEqual(4);      
    });
    it('should have an attribute with the value id', () => {
        const schema = schemaJson;
        let telemetryTable: Table = schema["baremetal"]["telemetry"];

        // telemetryTable.attributes.forEach(a => {
        //     console.log("attribute values: ");
        //     console.log(a['attribute']);
        // })
       
        expect(telemetryTable.attributes.includes(['attribute']['id']));
    });
