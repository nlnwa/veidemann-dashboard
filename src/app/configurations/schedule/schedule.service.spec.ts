import {inject, TestBed} from '@angular/core/testing';
import {ScheduleService} from './schedule.service';

xdescribe('ScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleService]
    });
  });

  it('should ...', inject([ScheduleService], (service: ScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
