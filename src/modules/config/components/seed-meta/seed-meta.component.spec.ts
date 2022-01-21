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
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../commons/material.module';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {expect} from '@angular/flex-layout/_private-utils/testing';

fdescribe('SeedMetaComponent', () => {
  let component: SeedMetaComponent;
  let fixture: ComponentFixture<SeedMetaComponent>;
  let loader: HarnessLoader;

  let nameFormField: MatFormFieldHarness;
  let nameInput: any;

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
    nameInput = (await nameFormField.getControl()) as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message for invalid URLs', async () => {
    /** Valid URLs */
    await nameInput.setValue('http://www.nb.no');
    expect(await nameFormField.isControlValid()).toBeTruthy();
    await nameInput.setValue('http://www.nb.no/samlingen');
    expect(await nameFormField.isControlValid()).toBeTruthy();
    await nameInput.setValue('http://nb.no');
    expect(await nameFormField.isControlValid()).toBeTruthy();
    await nameInput.setValue('https://www.nb.no');
    expect(await nameFormField.isControlValid()).toBeTruthy();
    await nameInput.setValue('https://nb.no');
    expect(await nameFormField.isControlValid()).toBeTruthy();
    await nameInput.setValue('https://nb.no/samlingen');
    expect(await nameFormField.isControlValid()).toBeTruthy();
    await nameInput.setValue('www.nb.no');
    expect(await nameFormField.isControlValid()).toBeTruthy();
    await nameInput.setValue('nb.no');
    expect(await nameFormField.isControlValid()).toBeTruthy();
    await nameInput.setValue('api.nb.no');
    expect(await nameFormField.isControlValid()).toBeTruthy();
    await nameInput.setValue('ftp.nb.no');
    expect(await nameFormField.isControlValid()).toBeTruthy();

    /** Invalid URLs */
    await nameInput.setValue('');
    nameInput.blur();
    expect(await nameFormField.isControlValid()).toBeFalsy();
    expect(await nameFormField.getTextErrors()).toContain('The field is required');
    // await nameInput.setValue('htp://www.nb.no');
    // nameInput.blur();
    // expect(await nameFormField.isControlValid()).toBeFalsy();
    // expect(await nameFormField.getTextErrors()).toContain('Contains an invalid formatted URL');
    // await nameInput.setValue('api.nb.no:80');
    // nameInput.blur();
    // expect(await nameFormField.isControlValid()).toBeFalsy();
    // expect(await nameFormField.getTextErrors()).toContain('Contains an invalid formatted URL');
    // await nameInput.setValue('http://::www.nb.no');
    // nameInput.blur();
    // expect(await nameFormField.isControlValid()).toBeFalsy();
    // expect(await nameFormField.getTextErrors()).toContain('Contains an invalid formatted URL');
  });

  it('should detect invalid urls when entering multiple', async () => {
    await nameInput.setValue('https://www.nb.no http://nb.no nb.no');
    nameInput.blur();
    expect(await nameInput.getValue()).toBe('https://www.nb.no http://nb.no nb.no');
    expect(await nameFormField.isControlValid()).toBeTruthy();
  });
});
