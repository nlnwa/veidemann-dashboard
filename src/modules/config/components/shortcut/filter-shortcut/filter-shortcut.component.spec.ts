import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FilterShortcutComponent} from './filter-shortcut.component';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {AbilityModule} from '@casl/angular';
import {MatListModule} from '@angular/material/list';

describe('FilterShortcutComponent', () => {
  let component: FilterShortcutComponent;
  let fixture: ComponentFixture<FilterShortcutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), AbilityModule, MatListModule],
      declarations: [FilterShortcutComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterShortcutComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.configObject = new ConfigObject({kind: Kind.CRAWLENTITY});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with SEED config', () => {
    component.configObject = new ConfigObject({kind: Kind.SEED});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with CRAWLJOB config', () => {
    component.configObject = new ConfigObject({kind: Kind.CRAWLJOB});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
