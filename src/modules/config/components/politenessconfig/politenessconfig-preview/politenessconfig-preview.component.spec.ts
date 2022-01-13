import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PolitenessconfigPreviewComponent} from './politenessconfig-preview.component';
import {DurationFormatPipe} from '../../../../commons/pipes/duration-format.pipe';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {MatLabel} from '@angular/material/form-field';
import {MatChipList} from '@angular/material/chips';

describe('PolitenessconfigPreviewComponent', () => {
  let component: PolitenessconfigPreviewComponent;
  let fixture: ComponentFixture<PolitenessconfigPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ PolitenessconfigPreviewComponent, DurationFormatPipe, MatLabel, MatChipList],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolitenessconfigPreviewComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject({kind: Kind.POLITENESSCONFIG});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
