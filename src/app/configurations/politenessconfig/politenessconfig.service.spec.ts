import {inject, TestBed} from '@angular/core/testing';
import {PolitenessconfigService} from './politenessconfig.service';

describe('PolitenessconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolitenessconfigService]
    });
  });

  it('should ...', inject([PolitenessconfigService], (service: PolitenessconfigService) => {
    expect(service).toBeTruthy();
  }));
});
