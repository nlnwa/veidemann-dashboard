import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {SeedMetaComponent} from './seed-meta.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../../core/services';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LabelService} from '../../services';
import {of} from 'rxjs';
import {AnnotationComponent, LabelComponent} from '..';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {AbilityModule} from '@casl/angular';
import {CommonsModule} from '../../../commons';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {MaterialModule} from '../../../commons/material.module';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {expect} from '@angular/flex-layout/_private-utils/testing';
import {MatInputHarness} from '@angular/material/input/testing';
import {validUrlValidator} from './seed-urlvalidation';

describe('SeedMetaComponent', () => {
  let component: SeedMetaComponent;
  let fixture: ComponentFixture<SeedMetaComponent>;
  let loader: HarnessLoader;

  let nameFormField: MatFormFieldHarness;
  let nameInput: MatInputHarness;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AbilityModule,
        MaterialModule,
        RouterTestingModule,
        CommonsModule,
        CoreTestingModule.forRoot(),
        NoopAnimationsModule,
      ],
      declarations: [
        SeedMetaComponent,
        LabelComponent,
        AnnotationComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {canUpdate: () => true}
        },
        {
          provide: LabelService,
          useValue: {
            getLabelKeys: () => of([])
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(SeedMetaComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nameFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="name"]'}));
    nameInput = (await nameFormField.getControl()) as MatInputHarness;
    component.name.clearValidators();
    component.name.clearAsyncValidators();
    component.name.setValidators(Validators.compose([Validators.required, validUrlValidator]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate URLs', async () => {
    /** Valid URLs */
    await nameInput.setValue('http://www.nb.no');
    await nameInput.blur();
    expect(await nameFormField.isControlValid()).toBeTruthy();

    /** Invalid URLs */
    await nameInput.setValue('');
    await nameInput.blur();
    expect(await nameFormField.isControlValid()).toBeFalsy();

    await nameInput.setValue('http:// shouldfail.com');
    await nameInput.blur();
    expect(await nameFormField.isControlValid()).toBeFalsy();
    expect(await nameFormField.getTextErrors()).toContain('Contains invalid URL(s): http://');
  });
});
