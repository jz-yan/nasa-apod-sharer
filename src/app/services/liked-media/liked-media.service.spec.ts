import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY_FEED } from 'src/app/test-data';

import { LikedMediaService } from './liked-media.service';

describe('LikedMediaService', () => {
  let service: LikedMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CUSTOM_ELEMENTS_SCHEMA, useValue: {} }
      ],
    });
    service = TestBed.inject(LikedMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Testing saveLikedImages with no error', () => {
    jest.spyOn(localStorage, 'setItem');

    expect(service.saveLikedImages(EMPTY_FEED)).toBe(true);
  });

//   it('Testing saveLikedImages with error', () => {
//    jest.spyOn(localStorage, 'setItem').mockRejectedValueOnce;

//    expect(service.saveLikedImages(EMPTY_FEED)).toBe(false);
//  });

  it('Testing getLikedImages', () => {
    jest.spyOn(JSON, 'parse').mockImplementation(() => []);

    service.getLikedImages;

    expect(JSON.parse).toHaveBeenCalled();
  });
});
