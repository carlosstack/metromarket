import { TestBed, async, inject } from '@angular/core/testing';

import { AccessWithoutVerificateGuard } from './access-without-verificate.guard';

describe('AccessWithoutVerificateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessWithoutVerificateGuard]
    });
  });

  it('should ...', inject([AccessWithoutVerificateGuard], (guard: AccessWithoutVerificateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
