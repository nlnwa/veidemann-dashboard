import {inject, TestBed} from '@angular/core/testing';
import {CoreTestingModule} from '../../core.testing.module';
import {ConfigApiService} from './config-api.service';

describe('ConfigApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreTestingModule.forRoot()],
      providers: [ConfigApiService]
    });
  });

  it('should be created', inject([ConfigApiService], (service: ConfigApiService) => {
    expect(service).toBeTruthy();
  }));

  // it('returns a list of configObjects', () => {
  // });
  //
  // it('returns the count of configObjects', () => {
  // });
  //
  // it('can get a single configObject', () => {
  // });
  //
  // it('save a configObject correct', () => {
  // });
  //
  // it('updates a configObject correctly', () => {
  // });
  //
  // it('deletes a single configObject', () => {
  // });
  //
  // it('fetches a list of label keys for a kind of configObject', () => {
  // });
  //
  // it('get a list of script annotations for a configObject', () => {
  // });
});

