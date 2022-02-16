import {ConfigApiService} from '../../modules/core/services';
import {SeedUrlValidator} from './existing-url-validation';

describe('Existing URL validation', () => {

  it('should get seeds with similar url', () => {
    const configApiServiceSpy = jasmine.createSpyObj('ConfigApiService', ['list']);

    const listValueStub = 'stub value';
    configApiServiceSpy.list.and.returnValue(listValueStub);

    SeedUrlValidator.createBackendValidator(configApiServiceSpy);
    expect(configApiServiceSpy.list.calls.count()).withContext('spy method was called once').toBe(1);
    expect(configApiServiceSpy.list.calls.mostRecent().returnValue).toBe(listValueStub);
  });

});
