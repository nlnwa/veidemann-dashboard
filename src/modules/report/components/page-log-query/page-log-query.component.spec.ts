import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageLogQueryComponent } from './page-log-query.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CommonsModule} from '../../../commons';

describe('PageLogQueryComponent', () => {
  let component: PageLogQueryComponent;
  let fixture: ComponentFixture<PageLogQueryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonsModule, NoopAnimationsModule],
      declarations: [ PageLogQueryComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
