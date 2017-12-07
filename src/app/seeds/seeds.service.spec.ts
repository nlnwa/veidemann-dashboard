import {inject, TestBed} from '@angular/core/testing';
import {SeedService} from './seeds.service';

xdescribe('SeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeedService]
    });
  });

  it('should ...', inject([SeedService], (service: SeedService) => {
    expect(service).toBeTruthy();
  }));
});
