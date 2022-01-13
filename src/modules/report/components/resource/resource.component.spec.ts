import {ResourceComponent} from './resource.component';
import {Spectator, createComponentFactory} from '@ngneat/spectator';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {Resource} from '../../../../shared/models';
import {CommonsModule} from '../../../commons';

describe('ResourceComponent', () => {
  let spectator: Spectator<ResourceComponent>;
  let resource: Resource;

  const createComponent = createComponentFactory(
    {
      component: ResourceComponent,
      imports: [CoreTestingModule.forRoot(), CommonsModule]
    });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  resource = new Resource(
    {
      uri: 'www.example.com',
      discoveryPath: 'dilldall'
    });

  it('should create with resource', () => {
    spectator.setInput('resources', [resource]);
    // TODO: Validate result
    expect(spectator.component).toBeTruthy();
  });

});
