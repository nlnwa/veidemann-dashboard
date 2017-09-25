import {inject, TestBed} from '@angular/core/testing';
import {PolitenessConfigService} from './politenessconfig.service';

describe('PolitenessConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolitenessConfigService]
    });
  });

  it('should ...', inject([PolitenessConfigService], (service: PolitenessConfigService) => {
    expect(service).toBeTruthy();
  }));
});
