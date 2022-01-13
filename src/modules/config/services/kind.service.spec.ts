import {KindService} from './kind.service';
import {createServiceFactory, SpectatorService} from '@ngneat/spectator';
import {LabelService} from './label.service';

describe('KindService', () => {
  let spectator: SpectatorService<KindService>;
  const createService = createServiceFactory({
    imports: [],
    service: KindService,
    providers: [
      {provide: LabelService, useValue: {}}
      ]
  });

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});
