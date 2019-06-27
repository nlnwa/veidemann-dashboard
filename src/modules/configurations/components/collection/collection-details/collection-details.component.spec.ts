import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDetailsComponent } from './collection-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonsModule} from '../../../../commons/commons.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoreTestingModule} from '../../../../core/core.testing.module';

describe('CollectionDetailsComponent', () => {
  let component: CollectionDetailsComponent;
  let fixture: ComponentFixture<CollectionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionDetailsComponent ],
      imports: [
        RouterTestingModule,
        CommonsModule,
        NoopAnimationsModule,
        CoreTestingModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
