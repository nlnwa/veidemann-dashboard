import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {PageLogListComponent} from './page-log-list.component';


describe('PageLogListComponent', () => {
  let component: PageLogListComponent;
  let fixture: ComponentFixture<PageLogListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ PageLogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
