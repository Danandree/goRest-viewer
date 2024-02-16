import { TestBed } from '@angular/core/testing';

import { GoRestAPIService } from '../../services/go-rest-api.service';

describe('GoRestAPIService', () => {
  let service: GoRestAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoRestAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
