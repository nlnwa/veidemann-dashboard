import {LogApiService} from './log-api.service';

describe('LogApiService', () => {
  it('should be created', () => {
    const service = new LogApiService('localhost:8080');
    expect(service).toBeTruthy();
  });
});
