import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {PageLogListComponent} from './page-log-list.component';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import {CommonsModule} from '../../../commons';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


describe('PageLogListComponent', () => {
  let component: PageLogListComponent;
  let fixture: ComponentFixture<PageLogListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        KeyboardShortcutsModule,
        CommonsModule,
        NoopAnimationsModule
      ],
      declarations: [PageLogListComponent]
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
