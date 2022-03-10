import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupModalComponent } from 'src/app/components/media-component/media-component.component';
import { DIALOG_IMAGE, TEST_ERROR } from 'src/app/test-data';

import { DialogModalService } from './dialog-modal.service';

describe('DialogModalService', () => {
  let service: DialogModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, MatDialogModule, BrowserAnimationsModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: CUSTOM_ELEMENTS_SCHEMA, useValue: {} }
      ],
    });
    service = TestBed.inject(DialogModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Testing openModal', () => {
    jest.spyOn(service.dialog, 'open');

    service.openModal(DIALOG_IMAGE);

    expect(service.dialog.open).toHaveBeenCalledWith(PopupModalComponent, { data: DIALOG_IMAGE });
  });

  it('Testing openErrorModal', () => {
   jest.spyOn(service.dialog, 'open');

   service.openErrorModal(TEST_ERROR);

   expect(service.dialog.open).toHaveBeenCalled();
 });
});
