import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeedMetaComponent} from './seed-meta.component';
import {ConfigApiService} from '../../../core/services';
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
import {MatInputHarness} from '@angular/material/input/testing';
import {ConfigObject, ConfigRef, Kind, Meta, Seed} from '../../../../shared/models';
import {MatActionListHarness, MatListHarness} from '@angular/material/list/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {RouterTestingModule} from '@angular/router/testing';

const exampleMatchingSeeds: ConfigObject[] = [
  {
    kind: Kind.SEED,
    apiVersion: 'v1',
    id: 'existingSeed',
    seed: new Seed({
      disabled: false,
      jobRefList: [],
      entityRef: new ConfigRef({
        kind: Kind.CRAWLENTITY,
        id: 'exampleEntity'
      }),
    }),
    meta: new Meta({
      name: 'http://www.nb.no'
    })
  },
  {
    kind: Kind.SEED,
    apiVersion: 'v1',
    id: 'existingSeed2',
    seed: new Seed({
      disabled: false,
      jobRefList: [],
      entityRef: new ConfigRef({
        kind: Kind.CRAWLENTITY,
        id: 'exampleEntity',
      }),
    }),
    meta: new Meta({
      name: 'https://www.biblotekutvikling.no'
    })
  },
  {
    kind: Kind.SEED,
    apiVersion: 'v1',
    id: 'existingSeed3',
    seed: new Seed({
      disabled: false,
      jobRefList: [],
      entityRef: new ConfigRef({
        kind: Kind.CRAWLENTITY,
        id: 'exampleEntity2'
      }),
    }),
    meta: new Meta({
      name: 'https://www.nb.no'
    })
  },
  {
    kind: Kind.SEED,
    apiVersion: 'v1',
    id: 'existingSeed4',
    seed: new Seed({
      disabled: false,
      jobRefList: [],
      entityRef: new ConfigRef({
        kind: Kind.CRAWLENTITY,
        id: 'exampleEntity3'
      }),
    }),
    meta: new Meta({
      name: 'https://www.bokhylla.no'
    })
  },
];

fdescribe('SeedMetaComponent', () => {
  let component: SeedMetaComponent;
  let fixture: ComponentFixture<SeedMetaComponent>;
  let loader: HarnessLoader;

  let nameFormField: MatFormFieldHarness;
  let nameInput: MatInputHarness;
  let seedExistsOnEntityList: MatActionListHarness;
  let seedExistsList: MatListHarness;

  const configApiServiceSpy = jasmine.createSpyObj('ConfigApiService', ['list']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AbilityModule,
        MaterialModule,
        CommonsModule,
        CoreTestingModule.forRoot(),
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      declarations: [
        SeedMetaComponent,
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
          provide: ConfigApiService,
          useValue: configApiServiceSpy,
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(SeedMetaComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();

    nameFormField = await loader.getHarness<MatFormFieldHarness>(MatFormFieldHarness
      .with({selector: '[data-testid="name"]'}));
    nameInput = (await nameFormField.getControl()) as MatInputHarness;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Creating new seed', async () => {
    it('should validate URL', async () => {
      configApiServiceSpy.list.and.returnValue([]);
      component.entityRef = new ConfigRef();
      component.updateForm(new Meta());

      /** Valid URLs */

      await nameInput.setValue('http://www.nb.no');
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

    it('should warn that similar seeds already exists', async () => {
      configApiServiceSpy.list.and.returnValue(exampleMatchingSeeds);
      component.entityRef = exampleMatchingSeeds[0].seed.entityRef;
      component.updateForm(new Meta());

      await nameInput.setValue('nb.no');
      await nameInput.blur();

      expect(await nameFormField.hasErrors()).toBeTruthy();
      expect(await nameFormField.isControlValid()).toBeFalsy();
      const textErrors = await nameFormField.getTextErrors();
      expect(textErrors).toContain('URL with the same domain already exists for this entity');
      expect(textErrors).toContain('URL with the same domain already exists for another entity');
    });

    describe('Creating multiple new seeds', async () => {

      it('should validate URLs', async () => {
        configApiServiceSpy.list.and.returnValue([]);
        component.entityRef = new ConfigRef();
        component.updateForm(new Meta());

        /** Valid URLs */

        await nameInput.setValue('http://www.nb.no');
        expect(await nameFormField.isControlValid()).toBeTruthy();
        await nameInput.setValue('http://www.nb.no https://sporbiblioteket.nb.no ' +
          'https://bibsys-almaprimo.hosted.exlibrisgroup.com/primo-explore/search?vid=NB&lang=no_NO');
        expect(await nameFormField.isControlValid()).toBeTruthy();

        /** Invalid URLs */

        await nameInput.setValue('');
        await nameInput.blur();
        expect(await nameFormField.isControlValid()).toBeFalsy();

        await nameInput.setValue('http:// shouldfail.com http://nb.no http://3628126748');
        await nameInput.blur();
        expect(await nameFormField.isControlValid()).toBeFalsy();
        expect(await nameFormField.getTextErrors()).toContain('Contains invalid URL(s): http://, http://3628126748');
      });

      it('should warn that similar seeds already exists', async () => {
        configApiServiceSpy.list.and.returnValue(exampleMatchingSeeds);
        component.entityRef = exampleMatchingSeeds[0].seed.entityRef;
        component.updateForm(new Meta());

        await nameInput.setValue('nb.no biblotekutvikling.no');
        await nameInput.blur();

        expect(await nameFormField.hasErrors()).toBeTruthy();
        expect(await nameFormField.isControlValid()).toBeFalsy();
        const textErrors = await nameFormField.getTextErrors();
        expect(textErrors).toContain('URL with the same domain already exists for this entity');
        expect(textErrors).toContain('URL with the same domain already exists for another entity');
      });

      it('should move existing seeds to current entity by clicking button', async () => {
        configApiServiceSpy.list.and.returnValue(of(exampleMatchingSeeds[3]));
        component.entityRef = exampleMatchingSeeds[0].seed.entityRef;
        component.updateForm(new Meta());
        spyOn(component.move, 'emit');

        await nameInput.setValue('bokhylla.no');
        await nameInput.blur();
        expect(await nameFormField.hasErrors()).toBeTruthy();
        expect(await nameFormField.isControlValid()).toBeFalsy();
        const textErrors = await nameFormField.getTextErrors();
        expect(textErrors).toContain('URL with the same domain already exists for another entity');
        expect(textErrors).not.toContain('URL with the same domain already exists for this entity');

        seedExistsList = await loader.getHarness<MatListHarness>(MatListHarness
          .with({selector: '[data-testid="seedExistsList"]'}));

        const items = await seedExistsList.getItems();
        expect(items.length).toEqual(2);
        expect(await items[1].getText()).toEqual('https://www.bokhylla.no');

        const moveSeedToEntityButton = await items[1].getHarness<MatButtonHarness>(MatButtonHarness
          .with({selector: '[data-testid="seedExistsListMoveSeedToEntityButton"]'}));

        await moveSeedToEntityButton.click();

        expect(component.move.emit).toHaveBeenCalledWith({
          seed: exampleMatchingSeeds[3],
          entityRef: component.entityRef
        });
      });

      it('should remove a single duplicate url from list by clicking button', async () => {
        configApiServiceSpy.list.and.returnValue(of(exampleMatchingSeeds[0]));
        component.entityRef = exampleMatchingSeeds[0].seed.entityRef;
        component.updateForm(new Meta());
        spyOn(component, 'onRemoveExistingUrl').and.callThrough();

        await nameInput.setValue('http://www.nb.no');
        await nameInput.blur();

        expect(await nameFormField.hasErrors()).toBeTruthy();
        expect(await nameFormField.isControlValid()).toBeFalsy();
        const textErrors = await nameFormField.getTextErrors();

        expect(textErrors).not.toContain('URL with the same domain already exists for another entity');
        expect(textErrors).toContain('URL with the same domain already exists for this entity');

        seedExistsOnEntityList = await loader.getHarness<MatActionListHarness>(MatActionListHarness
          .with({selector: '[data-testid="seedExistsOnEntityList"]'}));
        const listItems = await seedExistsOnEntityList.getItems();
        expect(listItems.length).toEqual(1);

        const removeDuplicateSeed = await seedExistsOnEntityList.getItems();
        await removeDuplicateSeed[0].click();

        expect(component.onRemoveExistingUrl)
          .toHaveBeenCalledWith(exampleMatchingSeeds[0]);
        expect(await nameInput.getValue()).toBe('');
      });

      it('should remove all duplicate seed from input by clicking button', async () => {
        configApiServiceSpy.list.and.returnValue(of(exampleMatchingSeeds[0], exampleMatchingSeeds[1]));
        component.entityRef = exampleMatchingSeeds[0].seed.entityRef;
        component.updateForm(new Meta());
        spyOn(component, 'onRemoveExistingUrls').and.callThrough();

        await nameInput.setValue('http://historiewiki.no https://www.biblotekutvikling.no http://www.nb.no');
        await nameInput.blur();

        expect(await nameFormField.hasErrors()).toBeTruthy();
        expect(await nameFormField.isControlValid()).toBeFalsy();
        const textErrors = await nameFormField.getTextErrors();

        expect(textErrors).not.toContain('URL with the same domain already exists for another entity');
        expect(textErrors).toContain('URL with the same domain already exists for this entity');

        seedExistsOnEntityList = await loader.getHarness<MatActionListHarness>(MatActionListHarness
          .with({selector: '[data-testid="seedExistsOnEntityList"]'}));

        // TODO: Should only have 3 items in list (remove all button + 2 seeds).
        //  But for some reason duplicates are added for each url entered.
        const listItems = await seedExistsOnEntityList.getItems();
        expect(listItems.length).toEqual(7);

        const removeAllDupButton = await seedExistsOnEntityList.getItems(
          {text: 'Remove all from list'});

        await removeAllDupButton[0].click();
        // TODO: Same here, should be two values passed to method.
        expect(component.onRemoveExistingUrls)
          .toHaveBeenCalledWith(
            [exampleMatchingSeeds[0], exampleMatchingSeeds[1], exampleMatchingSeeds[0],
              exampleMatchingSeeds[1], exampleMatchingSeeds[0], exampleMatchingSeeds[1]]
          );
        fixture.detectChanges();
        await fixture.whenStable();
        expect(await nameInput.getValue()).toBe('http://historiewiki.no');
        // TODO: still has errors even if the url are removed from input.
        //  (existing-url-validation createBackend() still return validationErrors even if duplicate url is removed)
        // expect(await nameFormField.hasErrors()).toBeFalsy();
        // expect(await nameFormField.isControlValid()).toBeTruthy();
      });
    });

    describe('Updating a seed', async () => {

      it('should validate URL when updating existing seed', async () => {
        configApiServiceSpy.list.and.returnValue(exampleMatchingSeeds);
        component.entityRef = exampleMatchingSeeds[0].seed.entityRef;
        component.updateForm(new Meta({
          name: 'thto',
          created: new Date().toISOString(),
        }));
        await nameInput.blur();
        expect(await nameFormField.hasErrors()).toBeTruthy();
        expect(await nameFormField.isControlValid()).toBeFalsy();
        expect(await nameFormField.getTextErrors()).toContain('Contains invalid URL(s): thto');

        await nameInput.setValue('');
        expect(await nameFormField.hasErrors()).toBeTruthy();
        expect(await nameFormField.isControlValid()).toBeFalsy();
        expect(await nameFormField.getTextErrors()).toContain('The field is required');

        /** Since meta.created is set, async validator should not be active */
        await nameInput.setValue('http://www.nb.no');
        expect(await nameFormField.hasErrors()).toBeFalsy();
        expect(await nameFormField.isControlValid()).toBeTruthy();
      });
    });


  });

});


