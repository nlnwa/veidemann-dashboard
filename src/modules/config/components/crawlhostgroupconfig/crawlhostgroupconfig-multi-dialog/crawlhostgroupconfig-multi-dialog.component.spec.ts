import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlHostGroupConfigMultiDialogComponent} from './crawlhostgroupconfig-multi-dialog.component';
import {UntypedFormBuilder} from '@angular/forms';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {ConfigDialogData} from '../../../func';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';
import {LabelService} from '../../../services';
import {AuthService} from '../../../../core/services';
import {DurationPickerComponent} from '../../durationpicker/duration-picker';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AbilityModule} from '@casl/angular';
import {of} from 'rxjs';

describe('CrawlHostGroupConfigMultiDialogComponent', () => {
  let component: CrawlHostGroupConfigMultiDialogComponent;
  let fixture: ComponentFixture<CrawlHostGroupConfigMultiDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({kind: Kind.CRAWLHOSTGROUPCONFIG}),
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), AbilityModule, CommonsModule, NoopAnimationsModule],
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
      ],
      declarations: [CrawlHostGroupConfigMultiDialogComponent, LabelMultiComponent, DurationPickerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlHostGroupConfigMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
