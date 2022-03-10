import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SCROLL_INTERVAL } from 'src/app/constants';
import { TEST_DATE } from 'src/app/test-data';

import { ApodSharerService } from './apod-sharer.service';

describe('ApodSharerService', () => {
  let service: ApodSharerService;

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
    service = TestBed.inject(ApodSharerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Testing getNextDate', () => {
    expect(service.getNextDate(TEST_DATE, SCROLL_INTERVAL)).toBeInstanceOf(Date);
  })
});
