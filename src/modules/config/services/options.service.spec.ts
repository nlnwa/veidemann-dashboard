import {createServiceFactory, SpectatorService} from '@ngneat/spectator';
import {LabelService} from './label.service';
import {OptionsService} from './options.service';

describe('OptionsService', () => {
  let spectator: SpectatorService<OptionsService>;
  const createService = createServiceFactory({
    imports: [],
    service: OptionsService,
    providers: [LabelService]
  });

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});
