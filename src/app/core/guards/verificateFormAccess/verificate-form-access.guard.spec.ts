import { TestBed, async, inject } from '@angular/core/testing';

import { VerificateFormAccessGuard } from './verificate-form-access.guard';

describe('VerificateFormAccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificateFormAccessGuard]
    });
  });

  it('should ...', inject([VerificateFormAccessGuard], (guard: VerificateFormAccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
