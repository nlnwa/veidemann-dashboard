import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {EntityDetailsComponent} from './entity-details.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LabelService} from '../../../services';
import {of} from 'rxjs';
import {AnnotationComponent, LabelComponent, MetaComponent} from '../..';
import {Annotation, ConfigObject, CrawlEntity, Kind, Label, Meta} from '../../../../../shared/models';
import {AbilityModule} from '@casl/angular';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {AuthService} from '../../../../core/services';
import {RouterTestingModule} from '@angular/router/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {SimpleChange} from '@angular/core';
import {CommonsModule} from '../../../../commons';

const exampleCrawlEntity: ConfigObject = {
  id: 'configObject_id',
  apiVersion: 'v1',
  kind: Kind.CRAWLENTITY,
  meta: new Meta({
    name: 'Example Entity',
    createdBy: 'test',
    created: '01.01.1970',
    lastModified: '01.01.2021',
    lastModifiedBy: 'test',
    description: 'This is an example entity',
    labelList: [new Label({key: 'test', value: 'label'})],
    annotationList: [new Annotation({key: 'test', value: 'annotation'})]
  }),
  crawlEntity: new CrawlEntity()
};

describe('EntityDetailsComponent', () => {
  let component: EntityDetailsComponent;
  let fixture: ComponentFixture<EntityDetailsComponent>;
  let loader: HarnessLoader;

  let saveButton: MatButtonHarness;
  let updateButton: MatButtonHarness;
  let revertButton: MatButtonHarness;
  let deleteButton: MatButtonHarness;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AbilityModule,
        CommonsModule,
        RouterTestingModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot()
      ],
      declarations: [
        EntityDetailsComponent,
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

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDetailsComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject(exampleCrawlEntity);
    component.ngOnChanges({
      configObject: new SimpleChange(null, component.configObject, null)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Creating a new crawlEntity', () => {

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

  describe('Updating a crawlEntity', () => {
    beforeEach(async () => {
      fixture.detectChanges();
      updateButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'UPDATE'}));
      deleteButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'DELETE'}));
      revertButton = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({text: 'REVERT'}));
    });

    it('update button should be active if form is updated and valid', async () => {
      expect(await updateButton.isDisabled()).toBeTruthy();
      expect(component.canUpdate).toBeFalsy();
    });
  });
});
