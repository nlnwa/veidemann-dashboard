import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlConfigDialogComponent} from './crawlconfig-dialog.component';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {ConfigDialogData} from '../../../func';
import {CommonsModule} from '../../../../commons';
import {MetaComponent} from '../../meta/meta.component';
import {LabelComponent} from '../../label/label.component';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AnnotationComponent} from '../../annotation/annotation.component';
import {AbilityModule} from '@casl/angular';
import {AuthService} from '../../../../core/services';

describe('CrawlConfigDialogComponent', () => {
  let component: CrawlConfigDialogComponent;
  let fixture: ComponentFixture<CrawlConfigDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({kind: Kind.CRAWLCONFIG}),
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AbilityModule, CoreTestingModule.forRoot(), CommonsModule, NoopAnimationsModule],
      declarations: [CrawlConfigDialogComponent, MetaComponent, LabelComponent, AnnotationComponent],
      providers: [
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
    fixture = TestBed.createComponent(CrawlConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
