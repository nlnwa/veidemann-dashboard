import {inject, TestBed} from '@angular/core/testing';
import {AbilityModule} from '@casl/angular';
import {CoreTestingModule} from '../../core.testing.module';
import {GuardService} from './guard.service';

describe('GuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), AbilityModule],
      providers: [GuardService]
    });
  });

  it('should be created', inject([GuardService], (service: GuardService) => {
    expect(service).toBeTruthy();
  }));
});
