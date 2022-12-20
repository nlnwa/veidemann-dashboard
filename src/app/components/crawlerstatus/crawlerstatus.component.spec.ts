import {CrawlerStatusComponent} from './crawlerstatus.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {CoreTestingModule} from '../../../modules/core/core.testing.module';
import {AbilityModule} from '@casl/angular';
import {RunStatus} from '../../../shared/models';


describe('CrawlerStatusComponent', () => {
  // let spectator: Spectator<CrawlerStatusComponent>;

  const createComponent = createComponentFactory(
    {
      component: CrawlerStatusComponent,
      imports: [CoreTestingModule.forRoot(), MatCardModule, AbilityModule],
      providers: []
    });
  // eslint-disable-next-line @typescript-eslint/no-shadow
  // const RunStatus = RunStatus;
  //
  // beforeEach(() => spectator = createComponent());
  //
  // it('should create', () => {
  //   expect(spectator.component).toBeTruthy();
  // });
  //
  // it('should show RUNNING status in html', () => {
  //   spectator.setInput('crawlerStatus', RunStatus.RUNNING);
  //   const list = spectator.queryAll('.crawlerRunningButton');
  //   expect(list).not.toBeNull();
  //   expect(list).toHaveText('RUNNING');
  // });
  //
  // it('should show PAUSED status in html', () => {
  //   spectator.setInput('crawlerStatus', RunStatus.PAUSED);
  //   const list = spectator.queryAll('.crawlerPausedButton');
  //   expect(list).not.toBeNull();
  //   expect(list).toHaveText('PAUSED');
  // });
  //
  //
  // it('should show PAUSE_REQUESTED in html', () => {
  //   spectator.setInput('crawlerStatus', RunStatus.PAUSE_REQUESTED);
  //   // FIXME: Fragile testing based on generic selector
  //   const list = spectator.queryAll('h1');
  //   expect(list).not.toBeNull();
  //   expect(list).toHaveText('IS PAUSING');
  // });

});
