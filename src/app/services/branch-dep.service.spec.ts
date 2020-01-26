import { TestBed } from '@angular/core/testing';

import { BranchDepService } from './branch-dep.service';

describe('BranchDepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BranchDepService = TestBed.get(BranchDepService);
    expect(service).toBeTruthy();
  });
});
