import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {BrowserScriptDetailsComponent} from './browserscript-details.component';
import {SimpleChange} from '@angular/core';
import {
  Annotation,
  BrowserScript,
  browserScriptTypes,
  ConfigObject,
  Kind,
  Label,
  Meta
} from '../../../../../shared/models';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonsModule} from '../../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {BrowserScriptDirective} from './browserscript.directive';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {AuthService} from '../../../../core/services/auth';
import {AnnotationComponent, LabelComponent, MetaComponent} from '../..';
import {AbilityModule} from '@casl/angular';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatSelectHarness} from '@angular/material/select/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';


const exampleBrowserScript: ConfigObject = {
  id: 'configObject_id',
  apiVersion: 'v1',
  kind: Kind.BROWSERSCRIPT,
  meta: new Meta({
    name: 'Example BrowserScript',
    createdBy: 'test',
    created: '01.01.1970',
    lastModified: '01.01.2021',
    lastModifiedBy: 'test',
    description: 'This is an example BrowserScript',
    labelList: [new Label({key: 'test', value: 'label'})],
    annotationList: [new Annotation({key: 'test', value: 'annotation'})]
  }),
  browserScript: new BrowserScript({
    script: 'console.log(\'test\')',
    urlRegexpList: [],
    browserScriptType: null
  })
};

describe('BrowserScriptDetailsComponent', () => {
  let component: BrowserScriptDetailsComponent;
  let fixture: ComponentFixture<BrowserScriptDetailsComponent>;
  let loader: HarnessLoader;

  let saveButton: MatButtonHarness;
  let updateButton: MatButtonHarness;
  let revertButton: MatButtonHarness;
  let deleteButton: MatButtonHarness;

  let scriptTypeSelect: MatSelectHarness;
  // let urlRegexList: MatChipListHarness;


  // Async beforeEach needed when using external template
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
        BrowserScriptDetailsComponent,
        BrowserScriptDirective,
        MetaComponent,
        LabelComponent,
        AnnotationComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            canUpdate: () => true,
            canDelete: () => true,
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
    fixture = TestBed.createComponent(BrowserScriptDetailsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject(exampleBrowserScript);
    component.browserScriptTypes = browserScriptTypes;
    component.ngOnChanges({
      configObject: new SimpleChange(null, component.configObject, null)
    });
    fixture.detectChanges();

    scriptTypeSelect = await loader.getHarness<MatSelectHarness>(MatSelectHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Creating a new browserscript', () => {
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

  });

  describe('Updating a browserscript', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      updateButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'UPDATE'}));
      deleteButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'DELETE'}));
      revertButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'REVERT'}));
    });

    it('update button should be active if form is updated and valid', async () => {
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
      await scriptTypeSelect.open();
      const scriptTypeOptions = await scriptTypeSelect.getOptions({text: 'REPLACEMENT'});
      await scriptTypeOptions[0].click();

      fixture.detectChanges();

      expect(await updateButton.isDisabled()).toBeFalsy();
      expect(component.canUpdate).toBeTruthy();
    });

    it('script type dropdown should be filled with all script type options', async () => {
      await scriptTypeSelect.open();
      const scriptTypeOptions = await scriptTypeSelect.getOptions();
      await scriptTypeSelect.close();
      expect(scriptTypeOptions.length).toEqual(6);
    });
  });
});

