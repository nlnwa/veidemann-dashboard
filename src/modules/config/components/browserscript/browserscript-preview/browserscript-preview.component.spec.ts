import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {BrowserscriptPreviewComponent} from './browserscript-preview.component';
import {CommonsModule} from '../../../../commons';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {MonacoEditorModule} from '@materia-ui/ngx-monaco-editor';

describe('BrowserscriptPreviewComponent', () => {
  let component: BrowserscriptPreviewComponent;
  let fixture: ComponentFixture<BrowserscriptPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, MonacoEditorModule],
      declarations: [BrowserscriptPreviewComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserscriptPreviewComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject({kind: Kind.BROWSERSCRIPT});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
