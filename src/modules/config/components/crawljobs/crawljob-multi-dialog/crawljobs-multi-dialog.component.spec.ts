import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlJobMultiDialogComponent} from './crawljobs-multi-dialog.component';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FilesizeInputComponent} from '../../filesize-input/filesize-input.component';
import {DurationPickerComponent} from '../../durationpicker/duration-picker';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';
import {UntypedFormBuilder} from '@angular/forms';
import {CommonsModule} from '../../../../commons';
import {LabelService} from '../../../services';
import {AuthService} from '../../../../core/services';

describe('CrawlJobMultiDialogComponent', () => {
  let component: CrawlJobMultiDialogComponent;
  let fixture: ComponentFixture<CrawlJobMultiDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({kind: Kind.CRAWLJOB}),
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, NoopAnimationsModule, CoreTestingModule.forRoot()],
      declarations: [CrawlJobMultiDialogComponent,
        FilesizeInputComponent,
        DurationPickerComponent,
        LabelMultiComponent],
      providers: [
        UntypedFormBuilder,
        {provide: LabelService, useValue: {}},
        {provide: AuthService, useValue: {canUpdate: () => true}},
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {provide: MatDialogRef, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlJobMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
