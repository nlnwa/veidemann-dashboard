import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ScheduleMultiDialogComponent} from './schedule-multi-dialog.component';
import {FormBuilder} from '@angular/forms';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';
import {LabelService} from '../../../services';
import {ConfigDialogData} from '../../../func';
import {AuthService} from '../../../../core/services';

describe('ScheduleMultiDialogComponent', () => {
  let component: ScheduleMultiDialogComponent;
  let fixture: ComponentFixture<ScheduleMultiDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({kind: Kind.CRAWLSCHEDULECONFIG}),
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), CommonsModule, NoopAnimationsModule],
      providers: [FormBuilder,
        {provide: MatDialogRef, useValue: {}},
        {provide: LabelService, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {
          provide: AuthService, useValue: {
            canUpdate: () => true
          }
        }
      ],
      declarations: [ScheduleMultiDialogComponent, LabelMultiComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
