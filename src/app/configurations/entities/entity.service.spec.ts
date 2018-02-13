import {inject, TestBed} from '@angular/core/testing';
import {EntityService} from './entity.service';

xdescribe('EntityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityService]
    });
  });

  it('should ...', inject([EntityService], (service: EntityService) => {
    expect(service).toBeTruthy();
  }));
});
