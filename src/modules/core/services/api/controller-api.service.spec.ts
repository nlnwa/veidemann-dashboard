import {inject, TestBed} from '@angular/core/testing';
import {ControllerApiService} from './controller-api.service';
import {CoreTestingModule} from '../../core.testing.module';

describe('ControllerApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot()],
      providers: [ControllerApiService]
    });
  });

  it('should be created', inject([ControllerApiService], (service: ControllerApiService) => {
    expect(service).toBeTruthy();
  }));
});
