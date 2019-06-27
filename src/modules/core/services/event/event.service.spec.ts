import {TestBed} from '@angular/core/testing';

import {EventService} from './event.service';
import {AuthService} from '../auth';
import {AppConfigService} from '../app.config.service';

describe('EventService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EventService,
      {provide: AuthService, useValue: {}},
      {provide: AppConfigService, useValue: {}}
    ]
  }));

  it('should be created', () => {
    const service: EventService = TestBed.get(EventService);
    expect(service).toBeTruthy();
  });
});
