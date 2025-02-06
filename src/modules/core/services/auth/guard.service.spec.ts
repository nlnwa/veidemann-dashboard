import {inject, TestBed} from '@angular/core/testing';
import {CoreTestingModule} from '../../core.testing.module';
import {GuardService} from './guard.service';

describe('GuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot()],
      providers: [GuardService]
    });
  });

  it('should be created', inject([GuardService], (service: GuardService) => {
    expect(service).toBeTruthy();
  }));
});
