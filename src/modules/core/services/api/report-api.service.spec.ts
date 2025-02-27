import {inject, TestBed} from '@angular/core/testing';
import {CoreTestingModule} from '../../core.testing.module';
import { HttpClient } from '@angular/common/http';
import {ReportApiService} from './report-api.service';

describe('ReportApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot()],
      providers: [ReportApiService,
        {provide: HttpClient, useValue: {}}
      ]
    });
  });

  it('should be created', inject([ReportApiService], (service: ReportApiService) => {
    expect(service).toBeTruthy();
  }));
});
