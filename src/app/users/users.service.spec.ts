import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './users.service';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
