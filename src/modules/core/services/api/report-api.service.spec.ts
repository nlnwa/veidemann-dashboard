import {ReportApiService} from './report-api.service';

describe('ReportApiService', () => {
  it('should be created', () => {
    const service = new ReportApiService('localhost:8080');
    expect(service).toBeTruthy();
  });
});
