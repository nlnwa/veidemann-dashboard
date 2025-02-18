import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlJobDialogComponent} from './crawljob-dialog.component';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  AnnotationComponent,
  DurationPickerComponent,
  FilesizeInputComponent,
  LabelComponent,
  MetaComponent
} from '../..';
import {CommonsModule} from '../../../../commons';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {AuthService} from '../../../../core/services';

describe('CrawlJobDialogComponent', () => {
  let component: CrawlJobDialogComponent;
  let fixture: ComponentFixture<CrawlJobDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({kind: Kind.CRAWLJOB}),
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, NoopAnimationsModule, CoreTestingModule.forRoot()],
      declarations: [
        MetaComponent,
        CrawlJobDialogComponent,
        FilesizeInputComponent,
        DurationPickerComponent,
        LabelComponent,
        AnnotationComponent],
      providers: [
        {
          provide: LabelService,
          useValue: {
            getLabelKeys: () => of([])
          }
        },
        {
          provide: AuthService,
          useValue: {
            canUpdate: () => true,
          }
        },
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlJobDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
