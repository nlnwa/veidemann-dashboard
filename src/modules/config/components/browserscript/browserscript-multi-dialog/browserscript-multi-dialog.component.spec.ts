import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BrowserScriptMultiDialogComponent} from './browserscript-multi-dialog.component';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {CommonsModule} from '../../../../commons';
import {LabelMultiComponent} from '../../label/label-multi/label-multi.component';
import {LabelService} from '../../../services';
import {AuthService} from '../../../../core/services';

describe('BrowserScriptMultiDialogComponent', () => {
  let component: BrowserScriptMultiDialogComponent;
  let fixture: ComponentFixture<BrowserScriptMultiDialogComponent>;

  const MY_CONF = {
    configObject: new ConfigObject({kind: Kind.BROWSERSCRIPT})
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), CommonsModule],
      declarations: [BrowserScriptMultiDialogComponent, LabelMultiComponent],
      providers: [
        {provide: LabelService, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: MY_CONF},
        {provide: MatDialogRef, useValue: {}},
        {provide: AuthService, useValue: {canUpdate: () => true}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserScriptMultiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
