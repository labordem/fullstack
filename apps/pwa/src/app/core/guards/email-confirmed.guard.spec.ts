import { TestBed } from '@angular/core/testing';

import { EmailConfirmedGuard } from './email-confirmed.guard';

describe('EmailConfirmedGuard', () => {
  let guard: EmailConfirmedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmailConfirmedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
