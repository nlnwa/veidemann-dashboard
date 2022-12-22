import {ActionShortcutComponent} from './action-shortcut.component';
import {AbilityModule} from '@casl/angular';
import {CoreTestingModule} from '../../../../core/core.testing.module';
import {ConfigObject, Kind} from '../../../../../shared/models';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MatListModule} from '@angular/material/list';

describe('ActionShortcutComponent', () => {
  let component: ActionShortcutComponent;
  let fixture: ComponentFixture<ActionShortcutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot(), AbilityModule, MatListModule],
      declarations: [ActionShortcutComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionShortcutComponent);
    component = fixture.componentInstance;
    component.configObject = new ConfigObject();
    fixture.detectChanges();
  });

  it('should create', () => {
    component.configObject = new ConfigObject();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create with SEED', () => {
    component.configObject = new ConfigObject({kind: Kind.SEED});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should create with CRAWLJOB', () => {
    component.configObject = new ConfigObject({kind: Kind.CRAWLJOB});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should create with CRAWLENTITY', () => {
    component.configObject = new ConfigObject({kind: Kind.CRAWLENTITY});
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


});
