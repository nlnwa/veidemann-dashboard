import {TestBed} from '@angular/core/testing';

import {LabelService} from './label.service';
import {BackendService} from '../../core/services';

describe('LabelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LabelService,
      {
        provide: BackendService,
        useValue: {}
      }
    ]
  }));

  it('should be created', () => {
    const service: LabelService = TestBed.get(LabelService);
    expect(service).toBeTruthy();
  });
});
