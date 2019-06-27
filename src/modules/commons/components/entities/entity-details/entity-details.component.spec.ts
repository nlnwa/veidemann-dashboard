import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EntityDetailsComponent} from './entity-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material.module';
import {LabelsComponent, MetaComponent} from '../..';
import {AuthService} from '../../../../core/services/auth';
import {DatePipe} from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('EntityDetailsComponent', () => {
  let component: EntityDetailsComponent;
  let fixture: ComponentFixture<EntityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntityDetailsComponent, MetaComponent, LabelsComponent],
      imports: [MaterialModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        DatePipe,
        {
          provide: AuthService,
          useValue: {
            isAdmin: () => true
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
