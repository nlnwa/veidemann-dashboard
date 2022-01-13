import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {MetaPreviewComponent} from './meta-preview.component';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {ConfigObject} from '../../../../../shared/models/config';
import {MatIconModule} from '@angular/material/icon';

describe('MetaPreviewComponent', () => {
  let component: MetaPreviewComponent;
  let fixture: ComponentFixture<MetaPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, CoreTestingModule.forRoot()],
      declarations: [MetaPreviewComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaPreviewComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
