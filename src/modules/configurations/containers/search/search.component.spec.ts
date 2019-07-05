import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {CommonsModule} from '../../../commons/commons.module';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {SearchListComponent} from '../../components';
import {SeedConfigurationsComponent} from '../seed-configurations/seed-configurations.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SearchConfigurationService} from '../../services/search-configuration.service';
import {DataService, SearchDataService, SeedDataService} from '../../services/data';
import {SeedConfigurationService} from '../../services/seed-configuration.service';
import {of} from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, SearchListComponent, SeedConfigurationsComponent],
      imports: [CommonsModule, RouterTestingModule, CoreTestingModule.forRoot(), NoopAnimationsModule],
    }).overrideProvider(SearchConfigurationService, {
      useValue: {
        ngOnDestroy: () => {
        },
        configObject$: of(null)
      }
    }).overrideProvider(SearchDataService, {
      useValue: {
        ngOnDestroy: () => {
        },
        connect: () => of([]),
        disconnect: () => {
        }
      }
    }).overrideProvider(SeedConfigurationService, {
      useValue: {
        ngOnDestroy: () => {
        }
      }
    }).overrideProvider(SeedDataService, {
      useValue: {
        ngOnDestroy: () => {
        }
      }
    }).overrideProvider(DataService, {
      useValue: {
        ngOnDestroy: () => {
        }
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
