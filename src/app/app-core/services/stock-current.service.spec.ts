import { TestBed } from '@angular/core/testing';

import { StockCurrentService } from './stock-current.service';

describe('StockCurrentService', () => {
  let service: StockCurrentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCurrentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
