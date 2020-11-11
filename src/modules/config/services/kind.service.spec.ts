import { TestBed } from '@angular/core/testing';

import { KindService } from './kind.service';

describe('KindService', () => {
  let service: KindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
