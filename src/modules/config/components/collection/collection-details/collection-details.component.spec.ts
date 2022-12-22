import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {CollectionDetailsComponent} from './collection-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {AnnotationComponent, FilesizeInputComponent, LabelComponent, MetaComponent} from '../..';
import {
  Annotation,
  Collection,
  ConfigObject,
  Kind,
  Label,
  Meta,
  rotationPolicies,
  RotationPolicy,
  subCollectionTypes
} from '../../../../../shared/models';
import {AbilityModule} from '@casl/angular';
import {AuthService} from '../../../../core/services';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {SimpleChange} from '@angular/core';
import {MatCheckboxHarness} from '@angular/material/checkbox/testing';
import {MatSelectHarness} from '@angular/material/select/testing';
import {MatFormFieldHarness} from '@angular/material/form-field/testing';
import {CollectionMetaComponent} from '../../collection-meta/collection-meta.component';
import {MatInputHarness} from '@angular/material/input/testing';
import {expect} from '@angular/flex-layout/_private-utils/testing';

const exampleCollection: ConfigObject = {
  id: 'configObject_id',
  apiVersion: 'v1',
  kind: Kind.COLLECTION,
  meta: new Meta({
    name: 'Example Collection',
    createdBy: 'test',
    created: '01.01.1970',
    lastModified: '01.01.2021',
    lastModifiedBy: 'test',
    description: 'This is an example collection',
    labelList: [new Label({key: 'test', value: 'label'})],
    annotationList: [new Annotation({key: 'test', value: 'annotation'})]
  }),
  collection: new Collection({
    collectionDedupPolicy: RotationPolicy.NONE,
    fileRotationPolicy: RotationPolicy.NONE,
    compress: true,
    fileSize: null,
    subCollectionsList: []
  })
};

describe('CollectionDetailsComponent', () => {
  let component: CollectionDetailsComponent;
  let fixture: ComponentFixture<CollectionDetailsComponent>;
  let loader: HarnessLoader;

  let saveButton: MatButtonHarness;
  let updateButton: MatButtonHarness;
  let revertButton: MatButtonHarness;
  let deleteButton: MatButtonHarness;
  let addSubCollectionButton: MatButtonHarness;

  let compressCheckbox: MatCheckboxHarness;
  let dedupPolicySelect: MatSelectHarness;
  let fileRotationPolicySelect: MatSelectHarness;
  let subCollectionTypeSelect: MatSelectHarness;

  let subCollectionNameFormfield: MatFormFieldHarness;
  let subCollectionNameInput: MatInputHarness;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AbilityModule,
        RouterTestingModule,
        CommonsModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot()
      ],
      declarations: [
        CollectionDetailsComponent,
        CollectionMetaComponent,
        FilesizeInputComponent,
        LabelComponent,
        AnnotationComponent
      ],
      providers: [
        {
          provide: AuthService, useValue: {
            canUpdate: () => true,
            canDelete: () => true
          }
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
    fixture = TestBed.createComponent(CollectionDetailsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject(exampleCollection);
    component.rotationPolicies = rotationPolicies;
    component.subCollectionTypes = subCollectionTypes;
    component.ngOnChanges({
      configObject: new SimpleChange(null, component.configObject, null)
    });
    fixture.detectChanges();

    compressCheckbox = await loader.getHarness<MatCheckboxHarness>(MatCheckboxHarness);
    dedupPolicySelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness
      .with({selector: '[data-testid="collectionDedupPolicy"]'}));
    fileRotationPolicySelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness
      .with({selector: '[data-testid="fileRotationPolicy"]'}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Creating a new collection', () => {

    beforeEach(async () => {
      component.configObject.id = '';
      component.ngOnChanges({
        configObject: new SimpleChange(null, component.configObject, null)
      });
      fixture.detectChanges();
      saveButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'SAVE'}));
    });

    it('show save button when creating a new config if form is valid', async () => {
      expect(await saveButton.isDisabled()).toBeFalsy();
      expect(component.canSave).toBeTruthy();
    });

    it('clicking the save button emits a save event', async () => {
      await compressCheckbox.uncheck();
      expect(await saveButton.isDisabled()).toBeFalsy();
      expect(component.canSave).toBeTruthy();

      let cfg: ConfigObject | undefined;
      component.save.subscribe((config: ConfigObject) => {
        cfg = config;
      });
      await saveButton.click();
      expect(cfg.collection.compress).toEqual(false);
    });
  });

  describe('Updating a collection', () => {

    beforeEach(async () => {
      fixture.detectChanges();
      updateButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'UPDATE'}));
      deleteButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'DELETE'}));
      revertButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'REVERT'}));
      addSubCollectionButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness
        .with({selector: '[data-testid="addSubCollectionButton"]'}));
    });

    it('update button should be active if form is updated and valid', async () => {
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await compressCheckbox.uncheck();
      fixture.detectChanges();
      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(component.canUpdate).toBeTruthy();
    });

    it('Clicking update button emits an update event', async () => {
      expect(component.canUpdate).toBeFalsy();
      expect(await updateButton.isDisabled()).toBeTruthy();

      let update: ConfigObject | undefined;
      component.update.subscribe((config: ConfigObject) => {
        update = config;
      });

      await dedupPolicySelect.open();
      const yearlyOption = await dedupPolicySelect.getOptions({text: 'YEARLY'});
      await yearlyOption[0].click();

      fixture.detectChanges();

      expect(component.canUpdate).toBeTruthy();
      expect(await updateButton.isDisabled()).toBeFalsy();

      await updateButton.click();
      expect(update.collection.collectionDedupPolicy).toBe(RotationPolicy.YEARLY);
    });

    it('Deduplication policy dropdown should be filled with all rotation policy options', async () => {
      await dedupPolicySelect.open();
      const options = await dedupPolicySelect.getOptions();
      await dedupPolicySelect.close();
      expect(options.length).toEqual(5);
    });

    it('File rotation policy dropdown should be filled with all rotation policy options', async () => {
      await fileRotationPolicySelect.open();
      const options = await fileRotationPolicySelect.getOptions();
      await fileRotationPolicySelect.close();
      expect(options.length).toEqual(5);
    });

    it('Clicking add subcollection button, should show subcollection form', async () => {
      await addSubCollectionButton.click();
      fixture.detectChanges();
      subCollectionTypeSelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness
        .with({selector: '[data-testid="subCollectionType"]'}));
      subCollectionNameFormfield = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
        .with({selector: '[data-testid="subCollectionName"]'}));
      subCollectionNameInput = (await subCollectionNameFormfield.getControl()) as MatInputHarness;
      expect(await subCollectionNameInput.getValue()).toEqual('');
      expect(await subCollectionTypeSelect.getValueText()).toEqual('UNDEFINED');
    });

    it('Subcollection type dropdown should be filled with all subcollection type options', async () => {
      await addSubCollectionButton.click();
      subCollectionTypeSelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness
        .with({selector: '[data-testid="subCollectionType"]'}));
      await subCollectionTypeSelect.open();
      const subCollectionTypesOptions = await subCollectionTypeSelect.getOptions();
      await subCollectionTypeSelect.close();
      expect(subCollectionTypesOptions.length).toEqual(3);
    });

    it('SubCollection name field should validate', async () => {
      await addSubCollectionButton.click();
      subCollectionNameFormfield = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
        .with({selector: '[data-testid="subCollectionName"]'}));
      subCollectionNameInput = (await subCollectionNameFormfield.getControl()) as MatInputHarness;
      await subCollectionNameInput.setValue('');
      await subCollectionNameInput.blur();
      expect(await subCollectionNameFormfield.isControlValid()).toBeFalsy();
      expect(await subCollectionNameFormfield.getTextErrors()).toContain('The field is required');
      expect(component.canUpdate).toBeFalsy();

      await subCollectionNameInput.setValue('a');
      await subCollectionNameInput.blur();
      expect(await subCollectionNameFormfield.isControlValid()).toBeFalsy();
      expect(await subCollectionNameFormfield.getTextHints()).toContain('Minimum 2 characters');
      expect(component.canUpdate).toBeFalsy();

      await subCollectionNameInput.setValue('invalid-collection');
      await subCollectionNameInput.blur();
      expect(await subCollectionNameFormfield.isControlValid()).toBeFalsy();
      expect(await subCollectionNameFormfield.getTextErrors())
        .toContain('Invalid name. (Valid characters are A-Å a-å 0-9 _)');
      expect(component.canUpdate).toBeFalsy();

      await subCollectionNameInput.setValue('valid_collection');
      await subCollectionNameInput.blur();
      expect(await subCollectionNameFormfield.isControlValid()).toBeTruthy();
      expect(component.canUpdate).toBeTruthy();
    });

    /** Testing revert button */

    it('When form is dirty the revert button becomes active,clicking it reverts form back to initial values',
      async () => {
        expect(await revertButton.isDisabled()).toBeTruthy();
        expect(component.canRevert).toBeFalsy();

        await compressCheckbox.uncheck();
        fixture.detectChanges();
        expect(await revertButton.isDisabled()).toBeFalsy();
        expect(component.canRevert).toBeTruthy();

        await revertButton.click();
        fixture.detectChanges();
        expect(await compressCheckbox.isChecked()).toBeTruthy();
        expect(component.canUpdate).toBeFalsy();
        expect(await revertButton.isDisabled()).toBeTruthy();
      });

    /**  Testing delete button */
    it('Clicking delete button emits a delete event', async () => {
      let del: ConfigObject | undefined;
      component.delete.subscribe((config: ConfigObject) => {
        del = config;
      });

      expect(await deleteButton.isDisabled()).toBeFalsy();
      expect(component.canDelete).toBeTruthy();
      await deleteButton.click();

      expect(del.collection).toBe(component.configObject.collection);
    });
    // TODO: Should test add and remove one or more subCollections
  });
});
