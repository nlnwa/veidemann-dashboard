import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BrowserScriptDialogComponent} from './browserscript-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {ConfigDialogData} from '../../../func';
import {CommonsModule} from '../../../../commons';
import {MetaComponent} from '../../meta/meta.component';
import {BrowserScriptDirective} from '../browserscript-details/browserscript.directive';
import {LabelComponent} from '../../label/label.component';
import {LabelService} from '../../../services';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';
import {AnnotationComponent} from '../../annotation/annotation.component';
import {AbilityModule} from '@casl/angular';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {AuthService} from '../../../../core/services';


describe('BrowserScriptDialogComponent', () => {
  let component: BrowserScriptDialogComponent;
  let fixture: ComponentFixture<BrowserScriptDialogComponent>;

  const MY_CONF: ConfigDialogData = {
    configObject: new ConfigObject({kind: Kind.BROWSERSCRIPT}),
    options: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AbilityModule, CoreTestingModule.forRoot(), CommonsModule, NoopAnimationsModule],
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
            canUpdate: () => true
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: MY_CONF
        },
        {
          provide: MatDialogRef,
          useValue: {}
        }
        ],
      declarations: [BrowserScriptDialogComponent, MetaComponent, BrowserScriptDirective, LabelComponent, AnnotationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserScriptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
