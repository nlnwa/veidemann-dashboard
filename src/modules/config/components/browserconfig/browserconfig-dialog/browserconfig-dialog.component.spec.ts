import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BrowserConfigDialogComponent} from './browserconfig-dialog.component';
import {UntypedFormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {AnnotationComponent, DurationPickerComponent, LabelComponent, MetaComponent, SelectorComponent} from '../..';
import {DatePipe} from '@angular/common';
import {CommonsModule} from '../../../../commons';
import {ConfigDialogData} from '../../../func';
import {LabelService} from '../../../services';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {AuthService} from '../../../../core/services';

describe('BrowserConfigDialogComponent', () => {
  let component: BrowserConfigDialogComponent;
  let fixture: ComponentFixture<BrowserConfigDialogComponent>;


  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({
      kind: Kind.BROWSERCONFIG,
    }),
    options: {},
    allSelected: false
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(),
        CommonsModule,
        NoopAnimationsModule,
        MatDialogModule, ReactiveFormsModule],
      providers: [UntypedFormBuilder, DatePipe,
        {
          provide: LabelService,
          useValue: {
            getLabelKeys: () => of([])
          }
        },
        {
          provide: AuthService,
          useValue: {
            isAdmin: () => true,
            canUpdate: () => true,
          }
        },
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {
            }
          }
        }],
      declarations: [BrowserConfigDialogComponent,
        MetaComponent,
        DurationPickerComponent,
        SelectorComponent,
        LabelComponent,
        AnnotationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
