import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LabelMultiComponent } from './label-multi.component';
import {LabelService} from '../../../services';
import {ConfigObject} from '../../../../../shared/models/config';
import {MaterialModule} from '../../../../commons/material.module';

describe('LabelMultiComponent', () => {
  let component: LabelMultiComponent;
  let fixture: ComponentFixture<LabelMultiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ LabelMultiComponent ],
      providers: [
        {
          provide: LabelService,
          useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelMultiComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
