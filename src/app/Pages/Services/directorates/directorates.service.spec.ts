import { TestBed } from '@angular/core/testing';

import { DirectoratesService } from './directorates.service';

describe('DirectoratesService', () => {
  let service: DirectoratesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectoratesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
