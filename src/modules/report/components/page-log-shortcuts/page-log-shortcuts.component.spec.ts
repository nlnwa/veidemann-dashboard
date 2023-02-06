import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageLogShortcutsComponent} from './page-log-shortcuts.component';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {AbilityModule} from '@casl/angular';
import {CommonsModule} from '../../../commons';

describe('PageLogShortcutsComponent', () => {
  let component: PageLogShortcutsComponent;
  let fixture: ComponentFixture<PageLogShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageLogShortcutsComponent],
      imports: [
        CommonsModule,
        CoreTestingModule.forRoot(),
        AbilityModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLogShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
