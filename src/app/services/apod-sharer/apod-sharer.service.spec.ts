import { TestBed } from '@angular/core/testing';

import { ApodSharerService } from './apod-sharer.service';

describe('ApodSharerService', () => {
  let service: ApodSharerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApodSharerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
