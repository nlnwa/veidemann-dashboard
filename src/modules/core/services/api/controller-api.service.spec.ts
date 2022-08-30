import {ControllerApiService} from './controller-api.service';

describe('ControllerApiService', () => {
  it('should be created', () => {
    const service = new ControllerApiService('localhost:8080')
    expect(service).toBeTruthy();
  });
});
