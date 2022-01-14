import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SeedMultiDialogComponent} from './seed-multi-dialog.component';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {ConfigObject, Kind, Meta} from '../../../../../shared/models/config';
import {ConfigDialogData} from '../../../func';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LabelService} from '../../../services';
import {CommonsModule} from '../../../../commons';


describe('SeedMultiDialogComponent', () => {
  let component: SeedMultiDialogComponent;
  let fixture: ComponentFixture<SeedMultiDialogComponent>;
  let seed: ConfigObject;
  let crawlJob: ConfigObject;

  seed = new ConfigObject({
    id: '1000',
    apiVersion: 'v1',
    kind: Kind.SEED,
    meta: new Meta({
      name: 'Test'
    })
  });

  crawlJob = new ConfigObject({
    id: '1001',
    apiVersion: 'v1',
    kind: Kind.CRAWLJOB,
    meta: new Meta({
      name: 'TestCrawlJob'
    })
  });

  const MY_CONF: ConfigDialogData = {
    configObject: seed,
    options: {crawlJobs: [crawlJob]}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, CoreTestingModule.forRoot(), NoopAnimationsModule],
      declarations: [SeedMultiDialogComponent, LabelMultiComponent],
      providers: [
        {provide: LabelService, useValue: {}},
        {provide: AuthService, useValue: {canUpdate: () => true}},
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Better tests
  it('should show crawljobs in mat-select', () => {
    const ele = fixture.debugElement.query(By.css('mat-select')).nativeElement;
    // console.log(ele.childNodes[0])
    expect(ele.childNodes[0]).not.toBeNull();
    // expect(ele.childNodes[0].innerHTML).toContain('TestCrawlJob');
  });

  it('should have "options" populated ', () => {
    // console.log(component.data.options);
    expect(component.data.options.crawlJobs).not.toBeNull();
  });

});
