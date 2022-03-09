import { TestBed } from '@angular/core/testing';

import { LikedMediaService } from './liked-media.service';

describe('LikedMediaService', () => {
  let service: LikedMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
