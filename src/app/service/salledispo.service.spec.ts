import { TestBed } from '@angular/core/testing';

import { SalledispoService } from './salledispo.service';

describe('SalledispoService', () => {
  let service: SalledispoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalledispoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
