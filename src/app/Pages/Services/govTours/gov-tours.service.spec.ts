import { TestBed } from '@angular/core/testing';

import { GovToursService } from './gov-tours.service';

describe('GovToursService', () => {
  let service: GovToursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovToursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
