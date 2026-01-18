import { TestBed } from '@angular/core/testing';

import { NewsTypesService } from './news-types.service';

describe('NewsTypesService', () => {
  let service: NewsTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
