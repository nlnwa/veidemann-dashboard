import {ConfigApiService} from './config-api.service';

describe('ConfigApiService', () => {
  it('should be created', () => {
    const service = new ConfigApiService('localhost:8080')
    expect(service).toBeTruthy();
  });
});
