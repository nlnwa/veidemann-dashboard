import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CrawlConfigMultiDialogComponent} from './crawlconfig-multi-dialog.component';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {ConfigDialogData} from '../../../func';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';
import {LabelService} from '../../../services';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../../../../core/services';

describe('CrawlConfigMultiDialogComponent', () => {
  let component: CrawlConfigMultiDialogComponent;
  let fixture: ComponentFixture<CrawlConfigMultiDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({kind: Kind.CRAWLCONFIG}),
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), CommonsModule, NoopAnimationsModule],
      declarations: [CrawlConfigMultiDialogComponent, LabelMultiComponent],
      providers: [
        {provide: LabelService, useValue: {}},
        {provide: AuthService, useValue: {canUpdate: () => true}},
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {provide: MatDialogRef, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlConfigMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
