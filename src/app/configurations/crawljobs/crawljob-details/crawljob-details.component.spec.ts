import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CrawljobDetailsComponent} from './crawljob-details.component';

xdescribe('CrawljobDetailsComponent', () => {
  let component: CrawljobDetailsComponent;
  let fixture: ComponentFixture<CrawljobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrawljobDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawljobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
