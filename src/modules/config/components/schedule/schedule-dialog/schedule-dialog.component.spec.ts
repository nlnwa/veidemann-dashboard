import {ScheduleDialogComponent} from './schedule-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {FormBuilder} from '@angular/forms';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {CommonsModule} from '../../../../commons';
import {AnnotationComponent, LabelComponent, MetaComponent} from '../..';
import {ConfigDialogData} from '../../../func';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {AbilityModule} from '@casl/angular';
import {AuthService} from '../../../../core/services';

describe('ScheduleDialogComponent', () => {
  let spectator: Spectator<ScheduleDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({kind: Kind.CRAWLSCHEDULECONFIG}),
    options: {}
  };

  const createComponent = createComponentFactory(
    {
      component: ScheduleDialogComponent,
      declarations: [MetaComponent, LabelComponent, AnnotationComponent],
      imports: [AbilityModule, CoreTestingModule.forRoot(), MatDialogModule, CommonsModule],
      providers: [FormBuilder,
        {
          provide: LabelService,
          useValue: {
            getLabelKeys: () => of([])
          }
        },
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {provide: MatDialogRef, useValue: {}},
        {
          provide: AuthService, useValue: {
            canUpdate: () => true,
            canEdit: () => true
          }
        }
      ]
    });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

});
