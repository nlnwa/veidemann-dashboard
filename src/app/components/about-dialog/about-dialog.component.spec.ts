import {AboutDialogComponent} from './about-dialog.component';
import {CommonsModule} from '../../../modules/commons';
import {createComponentFactory, Spectator} from '@ngneat/spectator';

describe('AboutDialogComponent', () => {
  let spectator: Spectator<AboutDialogComponent>;


  const createComponent = createComponentFactory(
    {
      component: AboutDialogComponent,
      imports: [CommonsModule],
    });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  // it('should use dashboard-version from environment', () => {
  //   expect(spectator.component.dashBoardversion).toBe('DEV');
  // });
  //
  // it('should show Veidemann-frontier in deployment-version-list ', () => {
  //   const list = spectator.queryAll('.deployment-version-list li');
  //   expect(list).not.toBeNull();
  //   expect(list).toHaveText('Veidemann-frontier');
  // });

});
