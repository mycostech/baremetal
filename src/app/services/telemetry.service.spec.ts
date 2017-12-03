import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TelemetryService } from './telemetry.service';

describe('TelemetryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [TelemetryService]
    });
  });

  it('should be created', inject([TelemetryService], (service: TelemetryService) => {
    expect(service).toBeTruthy();
  }));
});
