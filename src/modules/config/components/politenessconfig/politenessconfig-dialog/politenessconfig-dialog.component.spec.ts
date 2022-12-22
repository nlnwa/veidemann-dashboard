import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PolitenessConfigDialogComponent} from './politenessconfig-dialog.component';
import {UntypedFormBuilder} from '@angular/forms';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {
  AnnotationComponent,
  DurationPickerComponent,
  LabelComponent,
  MetaComponent,
  SelectorComponent
} from '../..';
import {CommonsModule} from '../../../../commons';
import {LabelService} from '../../../services';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {AbilityModule} from '@casl/angular';
import {AuthService} from '../../../../core/services';

describe('PolitenessConfigDialogComponent', () => {
  let component: PolitenessConfigDialogComponent;
  let fixture: ComponentFixture<PolitenessConfigDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({
      kind: Kind.POLITENESSCONFIG
    }),
    options: {}
  };
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AbilityModule, CoreTestingModule.forRoot(), MatDialogModule, CommonsModule, NoopAnimationsModule],
      declarations: [PolitenessConfigDialogComponent,
        DurationPickerComponent,
        SelectorComponent,
        LabelComponent,
        MetaComponent,
        AnnotationComponent],
      providers: [UntypedFormBuilder,
        {
          provide: LabelService,
          useValue: {
            getLabelKeys: () => of([])
          }
        },
        {provide: AuthService, useValue: {canUpdate: () => true}},
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitenessConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
