import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShortcutListComponent } from './shortcut-list.component';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {AbilityModule} from '@casl/angular';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {CommonsModule} from '../../../../commons';
import {EntityNamePipe} from '../../../pipe';
import {ConfigService} from '../../../../commons/services';
import {of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';

describe('ShortcutListComponent', () => {
  let component: ShortcutListComponent;
  let fixture: ComponentFixture<ShortcutListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortcutListComponent, EntityNamePipe ],
      imports: [AbilityModule, CoreTestingModule.forRoot(), RouterTestingModule, CommonsModule],
      providers: [
        {provide: ConfigService, useValue: {
          get: () => of(null)
          }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with SeedConfig', () => {
    component.configObject = new ConfigObject({kind: Kind.SEED});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with CrawlConfig', () => {
    component.configObject = new ConfigObject({kind: Kind.CRAWLCONFIG});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
