import { TestBed } from '@angular/core/testing';

import { SelectedDataService } from './selected-data.service';

describe('SeelectedDataService', () => {
  let service: SelectedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
