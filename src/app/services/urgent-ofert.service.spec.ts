import { TestBed } from '@angular/core/testing';

import { UrgentOfertService } from './urgent-ofert.service';

describe('OfertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrgentOfertService = TestBed.get(UrgentOfertService);
    expect(service).toBeTruthy();
  });
});
