import { TestBed } from '@angular/core/testing';

//import { UserserviceService } from '../userservice.service';
import { UserserviceService } from './userservice.service';  // Adjust if needed based on your structure


describe('UserserviceService', () => {
  let service: UserserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
