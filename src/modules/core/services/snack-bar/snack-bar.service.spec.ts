import {inject, TestBed} from '@angular/core/testing';
import {SnackBarService} from './snack-bar.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonsModule} from '../../../commons';

describe('SnackBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, NoopAnimationsModule],
      providers: [SnackBarService]
    });
  });

  it('should be created', inject([SnackBarService], (service: SnackBarService) => {
    expect(service).toBeTruthy();
  }));
});
