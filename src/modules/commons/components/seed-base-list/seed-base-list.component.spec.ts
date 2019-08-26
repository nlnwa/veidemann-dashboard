import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SeedBaseListComponent} from './seed-base-list.component';
import {MaterialModule} from '../../material.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from '../../../configurations/services/data';
import {MatTableDataSource} from '@angular/material';

describe('SeedBaseListComponent', () => {
  let component: SeedBaseListComponent;
  let fixture: ComponentFixture<SeedBaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeedBaseListComponent],
      imports: [MaterialModule, NoopAnimationsModule],
      providers: [
        {
          provide: DataService,
          useFactory: () => new MatTableDataSource([])
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedBaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
