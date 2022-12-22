import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PolitenessConfigMultiDialogComponent} from './politenessconfig-multi-dialog.component';
import {UntypedFormBuilder} from '@angular/forms';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {DurationPickerComponent} from '../..';
import {MatLabel} from '@angular/material/form-field';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';
import {LabelService} from '../../../services';
import {AuthService} from '../../../../core/services';

describe('PolitenessConfigMultiDialogComponent', () => {
  let component: PolitenessConfigMultiDialogComponent;
  let fixture: ComponentFixture<PolitenessConfigMultiDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({
      kind: Kind.POLITENESSCONFIG
    }),
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), MatDialogModule, CommonsModule, NoopAnimationsModule],
      declarations: [PolitenessConfigMultiDialogComponent, DurationPickerComponent, MatLabel, LabelMultiComponent],
      providers: [UntypedFormBuilder,
        {provide: LabelService, useValue: {}},
        {provide: AuthService, useValue: {canUpdate: () => true}},
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitenessConfigMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
