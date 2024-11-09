import { TestBed } from '@angular/core/testing';

import { SprintManagementService } from './sprint-management.service';

describe('SprintManagementService', () => {
  let service: SprintManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SprintManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
