import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BrowserconfigPreviewComponent } from './browserconfig-preview.component';
import {CommonsModule} from '../../../../commons';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {ShortcutListComponent} from '../../shortcut/shortcut-list/shortcut-list.component';
import {AbilityModule} from '@casl/angular';
import {CoreTestingModule} from '../../../../core/core.testing.module';

describe('BrowserconfigPreviewComponent', () => {
  let component: BrowserconfigPreviewComponent;
  let fixture: ComponentFixture<BrowserconfigPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, CoreTestingModule.forRoot(), AbilityModule],
      declarations: [ BrowserconfigPreviewComponent, ShortcutListComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserconfigPreviewComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject({kind: Kind.BROWSERCONFIG});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
