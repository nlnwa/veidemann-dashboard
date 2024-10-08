import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {RoleMappingDialogComponent} from './rolemapping-dialog.component';
import {UntypedFormBuilder} from '@angular/forms';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {MatError} from '@angular/material/form-field';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfigDialogData} from '../../../func';

describe('RoleMappingDialogComponent', () => {
  let component: RoleMappingDialogComponent;
  let fixture: ComponentFixture<RoleMappingDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({kind: Kind.ROLEMAPPING}),
    options: {},
    allSelected: false
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), MatDialogModule, MatError, CommonsModule, NoopAnimationsModule],
      declarations: [RoleMappingDialogComponent],
      providers: [UntypedFormBuilder,
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMappingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
