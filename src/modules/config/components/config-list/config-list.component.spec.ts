import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ConfigListComponent} from './config-list.component';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import {MaterialModule} from '../../../commons/material.module';
import {CommonsModule} from '../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ConfigListComponent', () => {
  let component: ConfigListComponent;
  let fixture: ComponentFixture<ConfigListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigListComponent],
      imports: [
        KeyboardShortcutsModule,
        MaterialModule,
        CommonsModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
