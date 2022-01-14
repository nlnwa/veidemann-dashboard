import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserConfigMultiDialogComponent } from './browserconfig-multi-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {DurationPickerComponent} from '../..';
import {ConfigDialogData} from '../../../func';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';
import {LabelService} from '../../../services';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../../../../core/services';

describe('BrowserConfigMultiDialogComponent', () => {
  let component: BrowserConfigMultiDialogComponent;
  let fixture: ComponentFixture<BrowserConfigMultiDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject(
      {
        kind: Kind.BROWSERCONFIG
      }),
    options: {},
    allSelected: false
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, NoopAnimationsModule],
      declarations: [ BrowserConfigMultiDialogComponent, DurationPickerComponent, LabelMultiComponent],
      providers: [
        {provide: LabelService, useValue: {}},
        {
          provide: AuthService,
          useValue: {
            isAdmin: () => true,
            canUpdate: () => true,
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {
            }
          }
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserConfigMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
