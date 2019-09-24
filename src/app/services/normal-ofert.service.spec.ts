import { TestBed } from '@angular/core/testing';

import { NormalOfertService } from './normal-ofert.service';

describe('NormalOfertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NormalOfertService = TestBed.get(NormalOfertService);
    expect(service).toBeTruthy();
  });
});
