import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RoleMappingMultiDialogComponent } from './rolemapping-multi-dialog.component';
import {FormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonsModule} from '../../../../commons';
import {ConfigDialogData} from '../../../func';

describe('RoleMappingMultiDialogComponent', () => {
  let component: RoleMappingMultiDialogComponent;
  let fixture: ComponentFixture<RoleMappingMultiDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({kind: Kind.ROLEMAPPING}),
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, NoopAnimationsModule],
      declarations: [ RoleMappingMultiDialogComponent ],
      providers: [FormBuilder,
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMappingMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
