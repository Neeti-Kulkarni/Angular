import { TestBed } from '@angular/core/testing';

import { ProjectMgmtService } from './project-mgmt.service';

describe('ProjectMgmtService', () => {
  let service: ProjectMgmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectMgmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
