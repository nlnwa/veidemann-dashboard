import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {LoglevelComponent} from './loglevel.component';
import {CommonsModule} from '../../../commons';
import {CoreTestingModule} from '../../../core/core.testing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {LogService} from '../../services';
import {of} from 'rxjs';
import {LogLevel} from '../../../../shared/models';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../../../core/services';


describe('LoglevelComponent', () => {
  let component: LoglevelComponent;
  let fixture: ComponentFixture<LoglevelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        CoreTestingModule.forRoot()
      ],
      providers: [
        { provide: LogService, useValue: {
          getLogConfig: () => of({logLevelList: [new LogLevel()]})
          }},
        {
          provide: AuthService, useValue: {
            canUpdate: () => true
          }
        },
      ],
      declarations: [LoglevelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoglevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
