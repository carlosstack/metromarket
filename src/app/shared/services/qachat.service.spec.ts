import { TestBed } from '@angular/core/testing';

import { QachatService } from './qachat.service';

describe('QachatService', () => {
  let service: QachatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
