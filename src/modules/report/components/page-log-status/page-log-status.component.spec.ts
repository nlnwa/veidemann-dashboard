import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PageLogStatusComponent} from './page-log-status.component';
import {CoreTestingModule} from '../../../core/core.testing.module';

describe('PageLogStatusComponent', () => {
  let component: PageLogStatusComponent;
  let fixture: ComponentFixture<PageLogStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot()],
      declarations: [ PageLogStatusComponent ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
