import {inject, TestBed} from '@angular/core/testing';
import {SnackBarService} from './snack-bar.service';

xdescribe('SnackBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackBarService]
    });
  });

  it('should be created', inject([SnackBarService], (service: SnackBarService) => {
    expect(service).toBeTruthy();
  }));
});
