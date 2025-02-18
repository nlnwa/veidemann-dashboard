import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CollectionMetaComponent} from './collection-meta.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {MatInputHarness} from '@angular/material/input/testing';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {MaterialModule} from '../../../commons/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonsModule} from '../../../commons';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LabelComponent} from '../label/label.component';
import {AnnotationComponent} from '../annotation/annotation.component';
import {LabelService} from '../../services';
import {of} from 'rxjs';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {AuthService} from '../../../core/services';
import {expect} from '@angular/flex-layout/_private-utils/testing';
import {VALID_COLLECTION_NAME} from '../../../../shared/validation/patterns';

describe('CollectionMetaComponent', () => {
  let component: CollectionMetaComponent;
  let fixture: ComponentFixture<CollectionMetaComponent>;
  let loader: HarnessLoader;

  let nameFormField: MatFormFieldHarness;
  let nameInput: MatInputHarness;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule,
        CommonsModule,
        CoreTestingModule.forRoot(),
        NoopAnimationsModule
      ],
      declarations: [
        CollectionMetaComponent,
        LabelComponent,
        AnnotationComponent
      ],
      providers: [
        {
          provide: LabelService,
          useValue: {
            getLabelKeys: () => of([])
          }
        },
        {
          provide: AuthService,
          useValue: {canUpdate: () => true}
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(CollectionMetaComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nameFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="name"]'}));
    nameInput = (await nameFormField.getControl()) as MatInputHarness;

    component.name.clearValidators();
    component.name.setValidators(Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(VALID_COLLECTION_NAME)
    ]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate collection name', async () => {
    await nameInput.setValue('');
    await nameInput.blur();
    expect(await nameFormField.isControlValid()).toBeFalsy();
    expect(await nameFormField.getTextErrors()).toContain('Name is required.');
    //
    await nameInput.setValue('a');
    await nameInput.blur();
    expect(await nameFormField.isControlValid()).toBeFalsy();
    expect(await nameFormField.getTextHints()).toContain('Minimum 2 characters');

    await nameInput.setValue('invalid-collection');
    await nameInput.blur();
    expect(await nameFormField.isControlValid()).toBeFalsy();
    expect(await nameFormField.getTextErrors()).toContain('Invalid name. (Valid characters are A-Å a-å 0-9 _)');

    await nameInput.setValue('valid_collection');
    await nameInput.blur();
    expect(await nameFormField.isControlValid()).toBeTruthy();
  });
});
